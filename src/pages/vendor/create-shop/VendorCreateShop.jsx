import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LinkIcon, Mail, Plus, Store, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { useCreateShopMutation } from "../../../features/shop/shopApi";
import OutletModal from "./components/OutletModal";

const VendorCreateShop = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [outlets, setOutlets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [createShop, { isLoading, error, isSuccess }] = useCreateShopMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Shop created successfully!");
      navigate('/shop-overview')
    }
    if (error) {
      const message = error?.data?.message || "Shop created failed!";
      toast.error(message);
    }
  }, [navigate, isSuccess, error,]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      description: "",
      outlets: [],
    }
  });

  useEffect(() => {
    setValue("outlets", outlets);
  }, [outlets, setValue]);

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

  const handleAddOutlet = (newOutlet) => {
    setOutlets([...outlets, newOutlet]);
    setShowModal(false);
  };

  const onSubmit = (data) => {
    const shopData = {
      shop: {
        business_name: data.businessName,
        business_email: data.email,
        business_phone: {
          country_code: data.countryCode,
          phone_number: data.phoneNumber,
        },
        description: data.description,
        website: data.website,
      },
      outlet: data.outlets
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(shopData));
    formData.append("file", data.businessLogo);
    createShop(formData);
  };
  return (
    <div className="bg-white min-h-screen px-4 pt-32 pb-12">
      <div className="max-w-300 mx-auto">
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-[#262626]">Create Your Vendor Account</h1>
          <p className="text-[#737373] mt-1 text-base">
            Set up your business profile and start offering amazing deals to customers.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Business Details</h2>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-[#262626]">Business Name</label>
              <div className="relative">
                <Store className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.businessName ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  {...register("businessName", { required: "Business name is required" })}
                  placeholder="Enter your business name"
                  className={`w-full pl-12 pr-4 py-4 border rounded-full outline-none transition-all ${errors.businessName ? 'border-red-500' : 'border-gray-300 focus:border-primary'}`}
                />
              </div>
              {errors.businessName && <p className="text-red-500 text-xs mt-1 ml-4">{errors.businessName.message}</p>}
            </div>
            <div className="space-y-3">
              <label className="block text-lg font-medium text-[#262626]">Business Logo</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative">
                  {logoPreview ? (
                    <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-gray-100 shadow-inner">
                      <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-transform active:scale-90"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-40 h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-all hover:border-[#2B9DAE]/50">
                      <Plus className="w-10 h-10 mb-2 text-gray-300" />
                      <span className="text-sm font-medium">Upload Photos</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-xs text-[#737373] uppercase tracking-widest font-bold">JPEG, PNG or PDF max 10 MB</span>
                  <label className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full flex items-center gap-2 text-sm font-bold cursor-pointer transition-all shadow-md active:scale-95 w-fit">
                    <Plus className="w-5 h-5" /> Upload from files
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-[#262626]">Description (Optional)</label>
              <div className="relative">
                <textarea
                  {...register("description")}
                  placeholder="Business Description"
                  rows="5"
                  className="w-full p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
                />
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Contact Information</h2>
              <div className="space-y-2">
                <label className="block text-lg font-medium text-[#262626]">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    placeholder="Business email"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full focus:border-primary outline-none transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message}</p>}
              </div>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    country={"bd"}
                    enableSearch
                    value={value}
                    containerClass="w-full"
                    inputClass="!w-full !h-14 !py-4 !border !border-gray-300 !rounded-full"
                    onChange={(value, country) => {
                      const dialCode = country.dialCode;
                      const phoneNumber = value.slice(dialCode.length);

                      setValue("countryCode", `+${dialCode}`);
                      setValue("phoneNumber", phoneNumber);

                      onChange(value);
                    }}
                  />
                )}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Location Details</h2>
              <p className="text-[#737373] text-base leading-relaxed">
                If you operate a single outlet, click "Single Outlet" and enter its address and location details to continue.
              </p>

              <div className="border border-gray-200 rounded-xl p-4 space-y-4">
                {outlets.length === 0 && (
                  <p className="text-center text-gray-400 py-2 italic">No outlets added yet.</p>
                )}

                {outlets.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-[#F8FAFC] rounded-2xl group hover:bg-[#F1F5F9] transition-colors cursor-pointer border border-transparent hover:border-[#4BBDCF]/20">
                    <div className="flex items-center gap-4">
                      <div className="text-primary">
                        <Store size={22} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="font-bold text-primary text-lg whitespace-nowrap">Outlet {idx + 1}:</span>
                        <span className="text-[#737373] text-base truncate max-w-50 sm:max-w-xs">{item.address}</span>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-secondary transition-colors" size={24} />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 bg-primary hover:bg-secondary text-white rounded-xl flex items-center justify-center gap-2 text-lg font-bold transition-all shadow-md active:scale-[0.99]">
                  <Plus size={24} /> Add Outlet
                </button>
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-medium text-[#262626]">Website Link (Optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register("website")}
                    placeholder="Website link"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center md:mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-secondary text-white font-bold py-3.5 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl">
              {isLoading ? (
                <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
              ) : (
                <span className="font-medium text-lg text-[#FFFFFF]">Submit for Approval</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Outlet Modal */}
      {showModal && (
        <OutletModal
          onClose={() => setShowModal(false)}
          onSave={handleAddOutlet}
        />
      )}
    </div>
  );
};

export default VendorCreateShop;
