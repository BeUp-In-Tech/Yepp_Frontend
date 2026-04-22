import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LinkIcon, Mail, Plus, Store, X } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import VendorFormSkeleton from "../../../../components/skeleton/VendorFormSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useEditshopMutation, useGetVendorDetailsQuery } from "../../../../features/shop/shopApi";
import toast from "react-hot-toast";

const MAX_DESCRIPTION = 300;

const VendorEditShop = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state?.auth);
    const [logoPreview, setLogoPreview] = useState(null);
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset, } = useForm({
        defaultValues: {
            businessName: "",
            businessLogo: "",
            description: "",
            countryCode: "",
            phoneNumber: "",
            phone: "",
            website: "",
        },
    });
    const shopId = id || user?._id;
    const { data: shopDetails, isLoading } = useGetVendorDetailsQuery(shopId);
    const [editshop, { isLoading: editLoading, error, isSuccess }] = useEditshopMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Shop updated successfully!");
            navigate("/shop-overview");
        }
        if (error) {
            const message = error?.data?.message || "Shop update failed!";
            toast.error(message);
        }
    }, [navigate, isSuccess, error]);

    useEffect(() => {
        if (shopDetails?.data) {
            const { business_name, business_logo, business_phone, website, description } = shopDetails.data;

            const dialCode = business_phone?.country_code?.replace("+", "") || "";
            const phoneNumber = business_phone?.phone_number || "";

            reset({
                businessName: business_name || "",
                businessLogo: business_logo || "",
                description: description || "",
                countryCode: business_phone?.country_code || "",
                phoneNumber: phoneNumber,
                phone: dialCode + phoneNumber,
                website: website || "",
            });

            if (business_logo) {
                setLogoPreview(business_logo);
            }
        }
    }, [shopDetails, reset]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return <VendorFormSkeleton />;
    }

    const descriptionValue = watch("description") || "";

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("businessLogo", file);
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoPreview(null);
        setValue("businessLogo", null);
        if (fileInputRef1.current) fileInputRef1.current.value = "";
        if (fileInputRef2.current) fileInputRef2.current.value = "";
    };

    const onSubmit = (data) => {
        const shopData = {
            business_name: data?.businessName,
            business_phone: {
                country_code: data?.countryCode,
                phone_number: data?.phoneNumber,
            },
            description: data?.description,
            website: data?.website,
        };
        
        const formData = new FormData();
        formData.append("data", JSON.stringify(shopData));
        if (data?.businessLogo instanceof File) {
            formData.append("file", data?.businessLogo);
        }

        editshop({
            id: shopDetails?.data?._id,
            data: formData
        });
    };

    return (
        <div className="bg-white min-h-screen px-4 pt-32 pb-12">
            <div className="max-w-300 mx-auto">
                <div className="mb-10">
                    <h1 className="text-[32px] font-bold text-[#262626]">Edit Your Vendor Account</h1>
                    <p className="text-[#737373] mt-1 text-base">
                        Update your business profile details below.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-primary">Business Details</h2>
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-[#262626]">Business Name</label>
                            <div className="relative">
                                <Store
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.businessName ? "text-red-400" : "text-gray-400"
                                        }`}
                                />
                                <input
                                    {...register("businessName", { required: "Business name is required" })}
                                    placeholder="Enter your business name"
                                    className={`w-full pl-12 pr-4 py-4 border rounded-full outline-none transition-all ${errors.businessName
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-primary"
                                        }`}
                                />
                            </div>
                            {errors.businessName && (
                                <p className="text-red-500 text-xs mt-1 ml-4">{errors.businessName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-[#262626]">Business Logo</label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="relative">
                                    {logoPreview ? (
                                        <div className="w-48 h-44 rounded-xl overflow-hidden border-2 border-gray-100 shadow-inner">
                                            <img
                                                src={logoPreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeLogo}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-transform active:scale-90"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-48 h-44 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-all hover:border-[#2B9DAE]/50">
                                            <Plus className="w-10 h-10 mb-2 text-gray-300" />
                                            <span className="text-sm font-medium">Upload Photos</span>
                                            <input
                                                ref={fileInputRef1}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    )}
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="text-xs text-[#737373] uppercase tracking-widest font-bold">
                                        JPEG, PNG or PDF max 10 MB
                                    </span>
                                    <label className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full flex items-center gap-2 text-sm font-bold cursor-pointer transition-all shadow-md active:scale-95 w-fit">
                                        <Plus className="w-5 h-5" /> Upload from files
                                        <input
                                            ref={fileInputRef2}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right column: Contact Information ── */}
                    <div className="space-y-3">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-primary">Contact Information</h2>

                            {/* <div className="space-y-2">
                                <label className="block text-lg font-medium text-[#262626]">Business Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                                        })}
                                        readOnly
                                        placeholder="Business email"
                                        className={`w-full pl-12 pr-4 py-4 border rounded-full outline-none transition-all ${errors.email
                                            ? "border-red-500"
                                            : "border-gray-300 focus:border-primary"
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message}</p>
                                )}
                            </div> */}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-[#262626]">
                                Website Link (Optional)
                            </label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("website")}
                                    placeholder="Website link"
                                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="block text-lg font-medium text-[#262626]">
                                Description (Optional)
                            </label>
                            <div className="relative">
                                <textarea
                                    {...register("description", { maxLength: MAX_DESCRIPTION })}
                                    placeholder="Business Description"
                                    rows="3"
                                    className="w-full p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
                                />
                                <span
                                    className={`absolute bottom-4 right-5 text-sm font-medium ${descriptionValue.length > MAX_DESCRIPTION ? "text-red-500" : "text-gray-400"
                                        }`}
                                >
                                    {descriptionValue.length}/{MAX_DESCRIPTION}
                                </span>
                            </div>
                            {errors.description?.type === "maxLength" && (
                                <p className="text-red-500 text-xs mt-1 ml-4">
                                    Description cannot exceed {MAX_DESCRIPTION} characters.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-center mt-2 md:mt-6">
                        <button
                            type="submit"
                            disabled={editLoading}
                            className="bg-primary hover:bg-secondary text-white font-bold py-3.5 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl"
                        >
                            {editLoading ? (
                                <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full" />
                            ) : (
                                <span className="font-medium text-lg text-white">Update Shop</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorEditShop;
