import { useState } from "react";
import HeadingTitle from "../components/HeadingTitle";
import { Bell, Settings as Setting, ShieldAlert, User, } from "lucide-react";
import General from "./components/General";
import NotificationMsg from "./components/NotificationMsg";
import Security from "./components/Security";

const Settings = () => {
    const [activeTab, setActiveTab] = useState('General');
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Settings'
                description='Configure platform settings and preferences.' />
            <div className="flex items-center mt-10 gap-3 overflow-x-auto">
                <div onClick={() => setActiveTab('General')} className={`flex items-center ${activeTab === 'General' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm gap-1 cursor-pointer`}>
                    <span><Setting size={20} /></span>
                    <button>General</button>
                </div>
                <div onClick={() => setActiveTab('Users')} className={`flex items-center ${activeTab === 'Users' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm  cursor-pointer`}>
                    <span><User size={20} /></span>
                    <button>Users</button>
                </div>
                <div onClick={() => setActiveTab('Notification')} className={`flex items-center ${activeTab === 'Notification' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm gap-1 cursor-pointer`}>
                    <span><Bell size={20} /></span>
                    <button>Notification</button>
                </div>
                <div onClick={() => setActiveTab('Security')} className={`flex items-center ${activeTab === 'Security' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm gap-1 cursor-pointer`}>
                    <span><ShieldAlert size={20} /></span>
                    <button>Security</button>
                </div>
            </div>
            <div>
                {activeTab === 'General' && <General />}
                {activeTab === 'Users' && <TeamMember />}
                {activeTab === 'Notification' && <NotificationMsg />}
                {activeTab === 'Security' && <Security />}
            </div>
        </div>
    );
};

export default Settings;

