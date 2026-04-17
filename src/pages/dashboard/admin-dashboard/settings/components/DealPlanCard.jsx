import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { plans } from '../../../../../lib/data';
const DealPlanCard = () => {

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            quickStart: 10,
            standard: 15,
            extended: 20,
        }
    });

    const formValues = watch();

    const onSubmit = (data) => {
        console.log("Updated Pricing:", data);
    };
    return (
        <div className="p-8 bg-white rounded-lg shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-[#262626]">Deal Plans</h2>
                <p className="text-sm text-[#737373] font-medium">Configure vendor deals pricing</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-[#F8F9FE] p-6 rounded-xl border border-gray-50 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">{plan.title}</h3>
                                <p className="text-sm text-gray-400 mb-6">{plan.days}</p>
                            </div>

                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${formValues[plan.id] || 0}
                                </span>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-500">Amount:</label>
                                    <input
                                        type="number"
                                        {...register(plan.id, { min: 0 })}
                                        className="w-16 px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#4FBCC9] hover:bg-[#3daab7] text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default DealPlanCard;