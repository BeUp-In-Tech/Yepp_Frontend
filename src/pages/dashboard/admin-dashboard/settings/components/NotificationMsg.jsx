import { useState } from "react";

const NotificationMsg = () => {
    const [settings, setSettings] = useState([
        { id: 'vendor', title: 'New vendor registration', description: 'Receive email when a new vendor signs up', enabled: true },
        { id: 'deals', title: 'Deals Submission', description: 'Receive email when a new deal in submitted for approval', enabled: false },
        { id: 'payment', title: 'Payment Received', description: 'Receive email when a new vendor payment is processed', enabled: true },
        { id: 'system', title: 'System Alerts', description: 'Receive email for official alerts', enabled: true },
        { id: 'reports', title: 'Weekly Reports', description: 'Receive weekly summary reports', enabled: true },
    ]);

    const handleToggle = (id) => {
        setSettings((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newState = !item.enabled;
                    return { ...item, enabled: newState };
                }
                return item;
            })
        );
    };
    return (
        <div className="bg-white rounded-lg shadow-sm p-8 mt-5 min-h-[calc(100vh-480px)]">
            <div className="">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#262626]">Notification</h2>
                    <p className="text-sm font-medium text-[#737373]">Manage notification.</p>
                </div>
                <div className="space-y-4">
                    {settings.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-base text-[#262626]">{item.title}</h3>
                                <p className="text-[#737373] font-medium text-sm mt-1">{item.description}</p>
                            </div>
                            <button
                                onClick={() => handleToggle(item.id)}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${item.enabled ? 'bg-primary' : 'bg-[#E5E5E5]'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${item.enabled ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationMsg;