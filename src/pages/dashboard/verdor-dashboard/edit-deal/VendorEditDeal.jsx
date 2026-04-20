/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import UplodedImage from "../components/UplodedImage";
import { useEffect, useState } from "react";
import AddDealSkeleton from "../../../../components/skeleton/AddDealSkeleton";
import Tags from "./components/Tags";
import Highlights from "./components/Highlights";
import { useEditDealMutation, useGetDealDetailsQuery } from "../../../../features/deal/dealApi";
import { useNavigate, useParams } from "react-router-dom";
import useUserLocation from "../../../../hooks/useUserLocation";
import toast from "react-hot-toast";

const VendorEditDeal = () => {
    const { latitude, longitude } = useUserLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [imageFiles, setImagesFiles] = useState([]);
    const [initialTags, setInitialTags] = useState([]);
    const [qrPreview, setQrPreview] = useState("");
    const [upcPreview, setUpcPreview] = useState("");
    const [initialHighlights, setInitialHighlights] = useState([]);
    const { data: dealDetail, isLoading: dealDetailsLoading } = useGetDealDetailsQuery({ id, longitude, latitude });

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
        defaultValues: {
            title: "",
            regularPrice: 0,
            discountPercentage: 0,
            description: "",
            couponCode: "",
            outlets: [],
            category: "",
            qr_code: "",
            upc_code: "",
            startDate: "",
            endDate: "",
            deletedImages: [],
            deletedHighlights: [],
            deletedTags: [],
        }
    });
    const [editDeal, { isLoading, error, isSuccess }] = useEditDealMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Deal updated successfully!");
            navigate("/my-deals");
        }
        if (error) {
            const message = error?.data?.message || "Deal upaded failed!";
            toast.error(message);
        }

    }, [navigate, isSuccess, error, reset]);

    useEffect(() => {
        if (dealDetail?.data) {
            const { title, highlight, tags, description, reguler_price, discount, available_outlet, coupon, category, createdAt, promotedUntil, coupon_option, } = dealDetail.data || {};
            const { qr, upc } = coupon_option || {};
            const formatDate = (date) => {
                if (!date) return "";
                return new Date(date).toISOString().split("T")[0];
            };
            reset({
                title: title || "",
                regularPrice: reguler_price || 0,
                discountPercentage: discount || 0,
                description: description || "",
                couponCode: coupon || "",
                outlets: available_outlet.map(outlet => outlet?._id),
                category: category?._id,
                startDate: formatDate(createdAt),
                endDate: formatDate(promotedUntil),
                qr_code: null,
                upc_code: null,
            });
            setQrPreview(qr || "");
            setUpcPreview(upc || "");
            setInitialTags(tags || []);
            setInitialHighlights(highlight || []);
        }
    }, [dealDetail, reset]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const qrFile = watch("qr_code");
    const upcFile = watch("upc_code");
    useEffect(() => {
        if (qrFile && qrFile[0]) {
            setQrPreview(URL.createObjectURL(qrFile[0]));
        }
    }, [qrFile]);

    useEffect(() => {
        if (upcFile && upcFile[0]) {
            setUpcPreview(URL.createObjectURL(upcFile[0]));
        }
    }, [upcFile]);

    if (dealDetailsLoading) {
        return <AddDealSkeleton />;
    }
    const watchRegularPrice = watch("regularPrice");
    const watchDiscount = watch("discountPercentage");
    const finalPrice = watchRegularPrice - (watchRegularPrice * (watchDiscount / 100));

    const onSubmit = (data) => {
        const qrFile = data.qr_code?.[0];
        const upcFile = data.upc_code?.[0];
        const finalData = {
            qr_code: qrFile ? qrFile : dealDetail.data.coupon_option.qr,
            upc_code: upcFile ? upcFile : dealDetail.data.coupon_option.upc,
        };

        const updateDeal = {
            category: data?.category,
            title: data?.title,
            reguler_price: data?.regularPrice,
            discount: data?.discountPercentage,
            highlight: data?.highlights,
            deletedImages: data?.deletedImages,
            deletedHighlights: data?.deletedHighlights,
            tags: data?.tags,
            deletedTags: data?.deletedTags,
            description: data?.description,
            available_in_outlet: Array.isArray(data?.outlets)
                ? data.outlets
                : [data?.outlets],
            coupon: data?.couponCode,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(updateDeal));
        imageFiles.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("qr", data?.qr_code?.[0] || finalData?.qr_code);
        formData.append("upc", data?.upc_code?.[0] || finalData?.upc_code);

        editDeal(
            {
                id: id,
                data: formData
            }
        );
    };

    return (
        <div className="bg-white min-h-screen px-4 pt-28 pb-12">
            <div className="max-w-305 mx-auto">
                <h1 className="text-[#262626] text-2xl sm:text-[32px] font-bold pb-6">Update Your Deal</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Media and Deal Pricing */}
                    <div className="flex flex-col md:flex-row gap-12.5">
                        <UplodedImage
                            setImagesFiles={setImagesFiles}
                            getAllImages={dealDetail?.data?.images}
                            setValue={setValue} />
                        <div className="w-full md:w-1/2 space-y-3 lg:space-y-6">
                            <h2 className="text-primary text-xl font-bold mb-3">Deal Pricing:</h2>
                            {/* Regular Price */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Regular Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#262626]">
                                        $
                                    </span>
                                    <input
                                        min={0}
                                        {...register("regularPrice", {
                                            valueAsNumber: true,
                                            required: "Regular price is required",
                                        })}
                                        type="number"
                                        className="w-full pl-10 pr-6 py-4 border border-gray-400 rounded-full text-[#262626] outline-0"
                                    />
                                </div>
                                {errors.regularPrice && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.regularPrice.message}
                                    </p>
                                )}
                            </div>
                            {/* Discount */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    What is the discount percentage for this deal?
                                </label>
                                <div className="relative">
                                    <input
                                        min={0}
                                        max={100}
                                        {...register("discountPercentage", {
                                            valueAsNumber: true,
                                            required: "Discount percentage is required",
                                        })}
                                        type="number"
                                        className="w-full px-6 py-4 border border-gray-400 rounded-full text-[#262626] outline-0"
                                    />
                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[#262626]">
                                        %
                                    </span>
                                </div>
                                {errors.discountPercentage && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.discountPercentage.message}
                                    </p>
                                )}
                            </div>
                            {/* Final Price */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Final price after the discount
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly
                                        value={`$${finalPrice.toFixed(2)}`}
                                        className="w-full px-6 py-4 border border-gray-400 rounded-full text-[#262626] bg-gray-50 outline-0 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deal Info and Plan */}
                    <div className="flex flex-col md:flex-row gap-12.5">
                        <div className="w-full md:w-1/2 space-y-3 lg:space-y-4">
                            <h2 className="text-xl font-bold text-primary">Deal Info:</h2>
                            {/* Title */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Deal Title
                                </label>
                                <input
                                    {...register("title", {
                                        required: "Deal title is required",
                                    })}
                                    placeholder="Title"
                                    className="w-full px-6 py-4 border border-gray-400 rounded-full text-[#262626] outline-0"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Highlights */}
                            <Highlights setValue={setValue} initialHighlights={initialHighlights} />

                            {/* Coupon */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Coupon Code
                                </label>
                                <input
                                    {...register("couponCode", {
                                        required: "Coupon code is required",
                                    })}
                                    placeholder="ABCD456"
                                    className="w-full px-6 py-4 border border-gray-400 rounded-full text-[#262626] outline-0"
                                />
                                {errors.couponCode && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.couponCode.message}
                                    </p>
                                )}
                            </div>

                            {/* Tags */}
                            <Tags setValue={setValue} initialTags={initialTags} />
                        </div>

                        <div className="w-full md:w-1/2 space-y-3 lg:space-y-4">
                            {/* Description */}
                            <div className="mt-10">
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Description
                                </label>
                                <div className="relative">
                                    <textarea
                                        {...register("description", {
                                            required: "Description is required",
                                        })}
                                        placeholder="Enter Product Description"
                                        rows={6}
                                        className="w-full p-4 border rounded-2xl bg-white outline-0 border-gray-400"
                                    />
                                </div>
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            {/* QR & UPC Code */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Upload QR & UPC code image
                                </label>
                                <div className="flex gap-3">
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register("qr_code")}
                                            className="w-full px-3 py-2 border border-gray-400 rounded-xl text-[#262626] outline-0 file:mr-4 file:py-2 file:px-4 file:border-0"
                                        />
                                        {errors.qr_code && <p className="text-red-500 text-sm mt-1">{errors.qr_code.message}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register("upc_code")}
                                            className="w-full px-3 py-2 border border-gray-400 rounded-xl text-[#262626] outline-0 file:mr-4 file:py-2 file:px-4 file:border-0"
                                        />
                                        {errors.upc_code && <p className="text-red-500 text-sm mt-1">{errors.upc_code.message}</p>}
                                    </div>
                                </div>
                            </div>
                            {/* Show image */}
                            <div className="flex gap-3 mt-5">
                                <div>
                                    <label className="block text-sm text-[#6b6767] font-medium mb-2">QR Code</label>
                                    {qrPreview && (
                                        <img src={qrPreview} alt="QR Preview" className="mb-2 w-36 h-24 object-contain border border-gray-300 rounded-md" />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-[#6b6767] font-medium mb-2">UPC Code</label>
                                    {upcPreview && (
                                        <img src={upcPreview} alt="UPC Preview" className="mb-2 w-36 h-24 object-contain border border-gray-300 rounded-md" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="text-center pt-10">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary hover:bg-secondary text-white font-bold py-3.5 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl"
                        >
                            {isLoading ? (
                                <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                            ) : (
                                <span className="font-medium text-lg cursor-pointer text-[#FFFFFF]">Update Deal</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default VendorEditDeal;