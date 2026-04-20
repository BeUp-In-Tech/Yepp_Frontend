import { Bell, X } from "lucide-react";
import { useGetAllNotificaitonQuery } from "../../features/notification/notificaitonApi";
import { useSelector } from "react-redux";

const Notification = ({ setIsOpen }) => {
    const { user } = useSelector((state) => state?.auth);
    const { data: getAllNotificaiton, isLoading } = useGetAllNotificaitonQuery({
        id: user?._id
    });
    if (isLoading) {
        return <div className="absolute top-17.5 right-0 w-full max-w-md bg-white rounded-lg shadow-2xl z-20 overflow-hidden border border-slate-100" role="status" aria-label="Loading notifications">
            <Bell className="text-gray-300" size={20} aria-hidden="true" />
        </div>
    }

    return (
        <div className="absolute top-17.5 right-0 w-full max-w-md bg-white rounded-lg shadow-2xl z-20 overflow-hidden border border-slate-100" role="dialog" aria-labelledby="notification-heading">
            <div className="py-4 px-2 text-center border-b border-slate-50 relative">
                <h2 id="notification-heading" className="text-lg font-bold text-[#262626]">Notification</h2>
                <button
                    type="button"
                    aria-label="Close notifications"
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                    <X size={20} className='w-6 h-6' aria-hidden="true" />
                </button>
            </div>
            <div className="max-h-125 overflow-y-auto px-2 py-4 space-y-3 custom-scrollbar" aria-live="polite">
                {getAllNotificaiton?.data?.notifications?.length === 0 ? (
                    <div className="px-2 text-lg text-center text-gray-500">No notifications available</div>
                ) : (
                    getAllNotificaiton?.data?.notifications?.map((note) => (
                        <div
                            key={note._id}
                            className="group flex gap-4 p-4 bg-white/40 backdrop-blur-md border border-white/20 rounded-xl shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 ease-in-out"
                        >
                            <div className="shrink-0">
                                <div className="w-6 h-6 bg-linear-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
                                    <span className="text-yellow-900 font-serif font-black text-lg italic" aria-hidden="true">i</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-1">
                                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                                    {note?.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-snug">
                                    {note?.body?.split(" ").slice(0, 5).join(" ")}......
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notification;
