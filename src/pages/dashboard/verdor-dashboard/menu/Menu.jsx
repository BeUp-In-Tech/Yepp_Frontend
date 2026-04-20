import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Store, Plus, Mail, Phone, MapPin, Link as LinkIcon, X, GitCommitVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [logoPreview, setLogoPreview] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: "",
        }
    });

    // Watch description length for the counter
    const descriptionValue = watch("description", "");

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
    };

    const onSubmit = () => {
        navigate('/approval');
    };
    return (
        <div className="bg-white min-h-screen px-4 pt-28 pb-12">
            <div className="max-w-305 mx-auto">

                <div className="mb-10">
                    <h1 className="text-[32px] font-bold text-[#262626]">Edit Business Details</h1>
                    <p className="text-[#737373] mt-1 text-base">Set up your business profile and start offering amazing deals to customers.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                    {/* Left Column: Business Details */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-primary">Business Details</h2>

                        <div className="space-y-1">
                            <label className="block text-base font-medium text-[#262626]">Business Name</label>
                            <div className="relative">
                                <Store className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.businessName ? 'text-red-400' : 'text-gray-400'}`} />
                                <input
                                    {...register("businessName", { required: "Business name is required" })}
                                    placeholder="Enter your business name"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-full outline-none transition-all ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                            </div>
                            {errors.businessName && <p className="text-red-500 text-xs mt-1 ml-4">{errors.businessName.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-base font-medium text-[#262626]">Business Logo</label>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="relative group">
                                    {logoPreview ? (
                                        <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-200">
                                            <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                onClick={removeLogo}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
                                            <Plus className="w-8 h-8 mb-2" />
                                            <span className="text-xs text-center px-2">Upload Photos</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                        </label>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-sm text-[#737373] uppercase tracking-wider font-bold">JPEG, PNG or PDF max 10 MB</span>
                                    <label className="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors w-fit">
                                        <Plus className="w-4 h-4" /> Upload from files
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="space-y-1">
                            <label className="block text-base font-medium text-[#262626]">Description (Optional)</label>
                            <div className="relative">
                                <textarea
                                    {...register("description", { maxLength: 50 })}
                                    placeholder="Business Description"
                                    rows="5"
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
                                />
                                <span className={`absolute bottom-3 right-4 text-xs ${descriptionValue.length > 50 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                    {descriptionValue.length}/50
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-primary">Contact Information</h2>

                            <div className="space-y-1">
                                <label className="block text-base font-medium text-[#262626]">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                        })}
                                        placeholder="Business email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="block text-base font-medium text-[#262626]">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        {...register("phone", { required: "Phone number is required" })}
                                        placeholder="Business phone number"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-primary">Location Details</h2>
                            <div className="space-y-1">
                                <label className="block text-base font-medium text-[#262626]">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input {...register("location")} placeholder="Business location" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-base font-medium text-[#262626]">Zip Code</label>
                                <div className="relative">
                                    <GitCommitVertical className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input {...register("zip")} placeholder="Zip code" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-base font-medium text-[#262626]">Website Link (Optional)</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input {...register("website")} placeholder="Website link" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-secondary text-white font-bold py-3.5 px-16 rounded-full shadow-lg transition-all transform cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Menu;