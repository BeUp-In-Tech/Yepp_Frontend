import { useForm } from "react-hook-form";
import { Save, ChevronDown } from 'lucide-react';
import DealPlanCard from "./DealPlanCard";
const General = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data Submitted:", data);
    };
    return (
        <div>
            <div className="bg-white rounded-lg shadow-sm p-8 mt-5">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-[#262626]">Platform Settings</h2>
                    <p className="text-sm text-[#737373] font-medium">Configure basic platform settings</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#575151]">Platform Settings</label>
                            <input
                                {...register("appName", { required: "App name is required" })}
                                type="text"
                                placeholder="App Name"
                                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all placeholder-gray-400 ${errors.appName ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                                    }`}
                            />
                            {errors.appName && <span className="text-xs text-red-500">{errors.appName.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#575151]">Support Email</label>
                            <input
                                {...register("supportEmail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                placeholder="example.support@gmail.com"
                                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all placeholder-gray-400 ${errors.supportEmail ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                                    }`}
                            />
                            {errors.supportEmail && <span className="text-xs text-red-500">{errors.supportEmail.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#575151]">Default Currency</label>
                            <div className="relative">
                                <select
                                    {...register("currency")}
                                    className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-600"
                                >
                                    <option value="USD ($)">USD ($)</option>
                                    <option value="EUR (€)">EUR (€)</option>
                                    <option value="GBP (£)">GBP (£)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#575151]">Time Zone</label>
                            <div className="relative">
                                <select
                                    {...register("timezone")}
                                    className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-600"
                                >
                                    <option value="UTC">UTC</option>
                                    <option value="EST">EST</option>
                                    <option value="PST">PST</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm active:scale-95"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <div className="rounded-lg shadow-sm mt-4">
                <DealPlanCard />
            </div>
        </div>
    );
};

export default General;