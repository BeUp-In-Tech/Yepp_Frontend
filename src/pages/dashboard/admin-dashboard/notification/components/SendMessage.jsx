import { useForm } from 'react-hook-form';
import PriviewPage from './PriviewPage';
import { Send } from 'lucide-react';

const SendMessage = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
   
    return (
        <div className="flex justify-between mt-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold text-[#262626]">Static Pages</h2>
                    <p className="text-sm text-[#737373] font-medium mb-6">Manage information pages on your platform</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold mb-1">Title</label>
                            <input
                                {...register("title")}
                                placeholder="Notification Title"
                                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Message</label>
                            <textarea
                                {...register("message")}
                                rows="6"
                                placeholder="write your message here"
                                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Notification Type</label>
                            <div className="flex gap-4">
                                {['Push', 'Email', 'Both'].map((t) => (
                                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value={t} {...register("type")} className="w-4 h-4" />
                                        <span className="text-sm text-gray-600">{t}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Recipents</label>
                            <div className="flex gap-4">
                                {['All Users', 'All Vendors',].map((t) => (
                                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" value={t} {...register("recipents")} className="w-4 h-4" />
                                        <span className="text-sm text-gray-600">{t}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <label className="flex items-center justify-between cursor-pointer w-full group">
                            <span className="block font-semibold mb-2">
                                Schedule for Later
                            </span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    {...register("scheduleLater")}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-[var(--primary-color)] transition-colors duration-200"></div>
                                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-6"></div>
                            </div>
                        </label>

                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-secondary transition-colors mt-6 cursor-pointer">
                            <span><Send /></span> Sent Notification
                        </button>
                    </div>
                </form>
                <PriviewPage />
            </div>
        </div>
    );
};

export default SendMessage;
