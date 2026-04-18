import HeadingTitle from '../components/HeadingTitle';
import { LayoutDashboard, Ticket } from 'lucide-react';
import CreateVoucher from './components/CreateVoucher';

const Vouchers = () => {
    // const [activeTab, setActiveTab] = useState('Create');
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Vouchers'
                description='Manage coupon codes for the vendors.'
            />
            {/* <div className="flex items-center mt-10 gap-3 overflow-x-auto">
                <div onClick={() => setActiveTab('Create')} className={`flex items-center ${activeTab === 'Create' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm gap-1 cursor-pointer`}>
                    <span><LayoutDashboard size={20} /></span>
                    <button>Create Vouchers</button>
                </div>
                <div onClick={() => setActiveTab('Send')} className={`flex gap-1 items-center ${activeTab === 'Send' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm  cursor-pointer`}>
                    <span><Ticket size={20} /> </span>
                    <button>Send Vouchers</button>
                </div>
            </div> */}
            {/* <div className='mt-5'>
                {activeTab === 'Create' && <CreateVoucher />}
            </div> */}
            <div className='mt-5'>
                <CreateVoucher />
            </div>
        </div>
    );
};

export default Vouchers;