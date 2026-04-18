import { Bell, X } from "lucide-react";
import { useState } from "react";
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
    const [readingNotificationId, setReadingNotificationId] = useState(null);
    const notifications = getAllNotificaiton?.data?.notifications ?? getAllNotificaiton?.notifications ?? [];

    const getNotificationDetailPath = (notificationId) => `/notification/${notificationId}`;

    const navigateToNotificationUrl = (webUrl, notificationId) => {
        if (!webUrl) {
            navigate(getNotificationDetailPath(notificationId));
            return;
        }

        try {
            const url = new URL(webUrl, window.location.origin);
            const normalizedPath = url.pathname.replace(/\/$/, "");

            if (url.origin === window.location.origin && normalizedPath === "/notification") {
                navigate(`${getNotificationDetailPath(notificationId)}${url.search}${url.hash}`);
                return;
            }

            if (url.origin === window.location.origin) {
                navigate(`${url.pathname}${url.search}${url.hash}`);
                return;
            }

            window.location.assign(url.href);
        } catch {
            if (webUrl.replace(/\/$/, "") === "/notification") {
                navigate(getNotificationDetailPath(notificationId));
                return;
            }

            navigate(webUrl);
        }
    };

    const handleNotificationClick = async (note) => {
        if (!note?._id || readingNotificationId) return;

        setReadingNotificationId(note._id);

        try {
            await getSingleNotification({
                id: note._id,
                listArgs: notificationQueryArgs,
            }).unwrap();

            navigateToNotificationUrl(note?.webUrl, note._id);
            setIsOpen(false);
        } catch {
            return;
        } finally {
            setReadingNotificationId(null);
        }
    };

    if (isLoading) {
        return <div className="absolute top-17.5 right-0 w-full max-w-md bg-white rounded-lg shadow-2xl z-20 overflow-hidden border border-slate-100" role="status" aria-label="Loading notifications">
            <Bell className="text-gray-300" size={20} aria-hidden="true" />
        </div>
    }

    return (
        <div className="absolute top-17.5 right-0 w-full max-w-md bg-white rounded-lg shadow-2xl z-20 overflow-hidden border border-slate-100" role="dialog" aria-labelledby="notification-heading">
            <div className="p-4 text-center border-b border-slate-50 relative">
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
                {notifications?.map((note) => (
                    <button
                        type="button"
                        key={note._id}
                        onClick={() => handleNotificationClick(note)}
                        aria-disabled={readingNotificationId === note._id}
                        className={`group flex w-full cursor-pointer gap-4 p-4 text-left backdrop-blur-md border rounded-xl shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 ease-in-out ${note?.isRead ? "bg-white/40 border-white/20" : "bg-[#F0F9FF] border-primary/30"}`}
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
                                {note?.body?.split(" ").slice(0, 5).join(" ")}...........
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Notification;
