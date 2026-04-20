import { Bell, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllNotificaitonQuery, useLazyGetSingleNotificationQuery } from "../../features/notification/notificaitonApi";
import { useSelector } from "react-redux";

const Notification = ({ setIsOpen }) => {
    const { user } = useSelector((state) => state?.auth);
    const navigate = useNavigate();
    const notificationQueryArgs = { id: user?._id };
    const { data: getAllNotificaiton, isLoading } = useGetAllNotificaitonQuery(notificationQueryArgs, {
        skip: !user?._id
    });
    const [getSingleNotification] = useLazyGetSingleNotificationQuery();
    const notifications = getAllNotificaiton?.data?.notifications ?? getAllNotificaiton?.notifications ?? [];

    const getNotificationDetailPath = (notificationId) => `/notification/${notificationId}`;

    const handleNotificationClick = (note) => {
        if (!note?._id) return;

        getSingleNotification({
            id: note._id,
            listArgs: notificationQueryArgs,
        }).unwrap().catch(() => {});

        navigate(getNotificationDetailPath(note._id));
        setIsOpen(false);
    };

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
                {notifications.length === 0 ? (
                    <div className="px-2 text-lg text-center text-gray-500">No notifications available</div>
                ) : (
                    notifications.map((note, index) => {
                        const isUnread = note?.isRead === false;

                        return (
                            <button
                                type="button"
                                key={note?._id ?? index}
                                onClick={() => handleNotificationClick(note)}
                                disabled={!note?._id}
                                className={`group relative flex w-full gap-4 rounded-lg border p-4 text-left shadow-sm transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${isUnread
                                    ? "border-primary/25 bg-[#E0F2FE] hover:bg-[#D7EEFE]"
                                    : "border-slate-100 bg-white hover:bg-slate-50"
                                    }`}
                            >
                                <div className="shrink-0">
                                    <div className={`flex h-6 w-6 items-center justify-center rounded-md shadow-inner transition-transform group-hover:rotate-6 ${isUnread
                                        ? "bg-linear-to-br from-primary to-secondary"
                                        : "bg-linear-to-br from-slate-200 to-slate-300"
                                        }`}>
                                        <span className={`font-serif text-lg font-black italic ${isUnread ? "text-white" : "text-slate-600"}`} aria-hidden="true">i</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-1 pr-4">
                                    <h3 className={`text-sm tracking-tight ${isUnread ? "font-bold text-slate-950" : "font-semibold text-slate-800"}`}>
                                        {note?.title}
                                    </h3>
                                    <p className={`text-sm leading-snug ${isUnread ? "font-medium text-slate-700" : "text-slate-500"}`}>
                                        {note?.body?.split(" ").slice(0, 5).join(" ")}......
                                    </p>
                                </div>
                                {isUnread && (
                                    <span className="absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary" aria-label="Unread notification" />
                                )}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Notification;
