import { ShieldAlert } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const Security = () => {
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: {
            twoFactor: true,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const newPassword = watch("newPassword");
    return (
        <div className="bg-white rounded-lg shadow-sm p-8 mt-5 min-h-[calc(100vh-480px)]">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-[#262626]">Security & Password Settings</h2>
                <p className="text-sm font-medium text-[#737373]">Configure platform security options & password.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
                    <div>
                        <h3 className="font-semibold text-[#262626]">Two-Factor Authentication</h3>
                        <p className="text-sm text-[#737373]">Require 2 Factor Authentication for all admin accounts.</p>
                    </div>
                    <Controller
                        name="twoFactor"
                        control={control}
                        render={({ field }) => (
                            <button
                                type="button"
                                onClick={() => field.onChange(!field.value)}
                                className={`${field.value ? 'bg-cyan-500' : 'bg-gray-200'
                                    } relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none`}
                            >
                                <span
                                    className={`${field.value ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
                                />
                            </button>
                        )}
                    />
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-[#000000] mb-2">Current Password</label>
                        <input
                            type="text"
                            placeholder="********************"
                            {...register("currentPassword", { required: "Current password is required" })}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#000000] mb-2">New Password</label>
                        <input
                            type="text"
                            placeholder="********************"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: { value: 8, message: "Must be at least 8 characters" }
                            })}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#000000] mb-2">Confirm New Password</label>
                        <input
                            type="text"
                            placeholder="********************"
                            {...register("confirmPassword", {
                                validate: value => value === newPassword || "Passwords do not match"
                            })}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#4BBDCF] hover:bg-[#46a4c1] text-white font-medium py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
                >
                    <ShieldAlert size={24} />
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default Security;