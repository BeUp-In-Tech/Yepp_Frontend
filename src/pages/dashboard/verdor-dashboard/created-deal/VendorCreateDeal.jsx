import { useForm } from "react-hook-form";
import UplodedImage from "../components/UplodedImage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateNewDealMutation } from "../../../../features/deal/dealApi";
import toast from "react-hot-toast";
import { useGetAllCategoriesQuery } from "../../../../features/categories/CategoriesApi";
import AddDealSkeleton from "../../../../components/skeleton/AddDealSkeleton";
import Tags from "./components/Tags";
import Highlights from "./components/Highlights";
import { useSelector } from "react-redux";
import { useGetVendorDetailsQuery } from "../../../../features/shop/shopApi";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import CategoriesSkeleton from "../../../../components/skeleton/CategoriesSkeleton";

const dealFormDefaultValues = {
    regularPrice: 0,
    discountPercentage: 0,
};

const VendorCreateDeal = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [imageFiles, setImagesFiles] = useState([]);
    const [imageError, setImageError] = useState("");
    const { user } = useSelector((state => state?.auth));
    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
        defaultValues: dealFormDefaultValues,
    });
    const navigate = useNavigate();
    const { data: categoriess, isLoading: categoryLoading } = useGetAllCategoriesQuery();
    const { data: shopDetails, isLoading: shopLoading } = useGetVendorDetailsQuery(user?._id);
    const [createNewDeal, { isLoading, error, isSuccess }] = useCreateNewDealMutation();

    useEffect(() => {
        window.scrollTo(0, 0)
        reset(dealFormDefaultValues);
    }, [reset]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Deal created successfully!");
            navigate("/my-deals");
        }
        if (error) {
            const message = error?.data?.message || "Deal created failed!";
            toast.error(message);
        }

    }, [navigate, isSuccess, error,]);

    if (shopLoading || categoryLoading) {
        return <AddDealSkeleton />
    }

    // eslint-disable-next-line react-hooks/incompatible-library
    const watchRegularPrice = watch("regularPrice");
    const watchDiscount = watch("discountPercentage");

    // Math logic for the final price
    const regularPrice = Number(watchRegularPrice) || 0;
    const discountPercentage = Number(watchDiscount) || 0;
    const finalPrice = regularPrice - (regularPrice * (discountPercentage / 100));

    const validateImages = () => {
        if (imageFiles.length === 0) {
            setImageError("Image is required");
            return false;
        }

        setImageError("");
        return true;
    };

    const onSubmit = (data) => {
        if (!validateImages()) return;

        const createDeal = {
            category: data?.category,
            title: data?.title,
            reguler_price: data?.regularPrice,
            discount: data?.discountPercentage,
            highlight: data?.highlights,
            tags: data?.tags,
            description: data?.description,
            available_in_outlet: Array.isArray(data?.outlets)
                ? data.outlets
                : [data?.outlets],
            coupon: data?.couponCode,
        };
        const formData = new FormData();
        formData.append("data", JSON.stringify(createDeal));

        if (imageFiles.length <= 0) {
            toast.error("Image is required");
            return;
        }

        imageFiles.forEach((file) => {
            formData.append("files", file);
        });

        formData.append("qr", data?.qr_code?.[0]);
        formData.append("upc", data?.upc_code?.[0]);
        createNewDeal(formData);
    };

    const onInvalid = () => {
        validateImages();
    };

    console.log(error);

    return (
        <div className="bg-white min-h-screen px-4 pt-28 pb-12">
            <div className="max-w-305 mx-auto">
                <h1 className="text-[#262626] text-2xl sm:text-[32px] font-bold pb-6">Add New Deal</h1>
                <form onSubmit={handleSubmit(onSubmit, onInvalid)} autoComplete="off">
                    {/* Media and Deal Pricing */}
                    <div className="flex flex-col md:flex-row gap-12.5">
                        <UplodedImage
                            setImagesFiles={setImagesFiles}
                            setValue={setValue}
                            imageError={imageError}
                            setImageError={setImageError}
                        />
                        <div className="w-full md:w-1/2 space-y-3 lg:space-y-4">
                            <h2 className="text-primary text-xl font-bold mb-3">Deal Pricing:</h2>
                            {/* Regular Price */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Regular Price<span className="text-red-500">*</span>
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
                                        autoComplete="off"
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
                                    What is the discount percentage for this deal?<span className="text-red-500">*</span>
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
                                        autoComplete="off"
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
                                    Final price after the discount<span className="text-slate-400 text-[10px">(read only)</span>
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
                                    Deal Title<span className="text-red-500">*</span>
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
                            <Highlights setValue={setValue} />



                            {/* tags */}
                            <Tags
                                setValue={setValue}
                            />
                            {/* outlets */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Available Location
                                </label>

                                <div className="flex gap-3 flex-wrap">
                                    {shopDetails?.data?.outlets?.map((out) => (
                                        <label
                                            key={out._id}
                                            className="flex items-center gap-2 border border-gray-400 rounded-md bg-gray-100 px-3 h-9 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                value={out._id}
                                                {...register("outlets", {
                                                    required: "Select at least one outlet",
                                                })}
                                                className="h-4 w-4"
                                            />

                                            <span className="text-gray-700 text-sm flex items-center gap-1">
                                                <MapPin size={18} />
                                                {out?.outlet_name || "Location Name"}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                {errors.outlets && (
                                    <p className="text-red-500 text-sm">
                                        {errors.outlets.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-3 lg:space-y-4">
                            {/* Deal Category */}
                            <div className="-mt-5 md:-mt-10">
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Deal Category<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("category", {
                                            required: "Category is required",
                                        })}
                                        className="w-full px-6 pr-12 py-4 border border-gray-400 rounded-full text-[#262626] outline-0 bg-white appearance-none">
                                        <option value="">Select Category</option>
                                        {categoriess?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat?.category_name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 cursor-pointer">
                                        <ChevronDown className="cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Description<span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <textarea
                                        {...register("description", {
                                            required: "Description is required",
                                        })}
                                        placeholder="Enter Product Description"
                                        rows={4}
                                        className="w-full p-4 border rounded-xl bg-white outline-0 border-gray-400"
                                    />
                                </div>

                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                            {/* Coupon, QR Code, UPC Code - Accordion */}
                            <div className="border border-gray-400 rounded-xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setOpenDropdown(prev => !prev)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-[#262626] font-medium text-base bg-white"
                                >
                                    <div className="flex items-center gap-1">
                                        <span>Coupon & Codes</span><span className="text-red-500">*</span>
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                        <ChevronDown className="cursor-pointer" />
                                    </span>
                                </button>
                                {openDropdown && (
                                    <div className="border-t border-gray-200">
                                        <div className="flex gap-3 px-6 py-3 bg-gray-50">
                                            {[
                                                { key: "coupon", label: "Coupon Code" },
                                                { key: "qr", label: "QR Code" },
                                                { key: "upc", label: "UPC Code" },
                                            ].map((item) => (
                                                <button
                                                    key={item.key}
                                                    type="button"
                                                    onClick={() => setActiveField(prev => prev === item.key ? null : item.key)}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${activeField === item.key
                                                        ? "bg-primary text-white border-primary"
                                                        : "bg-white text-[#262626] border-gray-400"
                                                        }`}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Coupon Code Field */}
                                        {activeField === "coupon" && (
                                            <div className="px-6 py-4 border-t border-gray-100">
                                                <label className="block text-base text-[#262626] font-medium mb-2">
                                                    Coupon Code
                                                </label>
                                                <input
                                                    {...register("couponCode")}
                                                    placeholder="ABCD456"
                                                    className="w-full px-6 py-4 border border-gray-400 rounded-xl text-[#262626] outline-0"
                                                />
                                            </div>
                                        )}

                                        {/* QR Code Field */}
                                        {activeField === "qr" && (
                                            <div className="px-6 py-4 border-t border-gray-100">
                                                <label className="block text-base text-[#262626] font-medium mb-2">
                                                    QR Code
                                                    <span className="text-[12px] pl-2 text-slate-400">(QR file must be 500 × 500)</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    {...register("qr_code")}
                                                    className="w-full px-3 py-2 border border-gray-400 rounded-xl text-[#262626] outline-0 file:mr-4 file:py-2 file:px-4 file:border-0"
                                                />
                                            </div>
                                        )}

                                        {/* UPC Code Field */}
                                        {activeField === "upc" && (
                                            <div className="px-6 py-4 border-t border-gray-100">
                                                <label className="block text-base text-[#262626] font-medium mb-2">
                                                    UPC Code
                                                    <span className="text-[12px] pl-2 text-slate-400">(UPC file must be 800 × 400)</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    {...register("upc_code")}
                                                    className="w-full px-3 py-2 border border-gray-400 rounded-xl text-[#262626] outline-0 file:mr-4 file:py-2 file:px-4 file:border-0"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="text-center pt-10">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary hover:bg-secondary cursor-pointer text-white font-bold py-3.5 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl">
                            {isLoading ? (
                                <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                            ) : (
                                <span className="font-medium text-lg text-[#FFFFFF]">Create Deal</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorCreateDeal;
