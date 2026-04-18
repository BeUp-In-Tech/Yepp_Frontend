import HeadingTitle from '../components/HeadingTitle';
import { LayoutDashboard, PanelsTopLeft, Plus } from 'lucide-react';
import StaticPageItem from './components/StaticPageItem';
import Categories from './components/Categories';

const Content = () => {
    // const [activeTab, setActiveTab] = useState('staticpage');
    // const pages = [
    //     { title: "About Us", date: "Jan 5, 2026" },
    //     { title: "Contact Us", date: "Jan 5, 2026" },
    //     { title: "Help & Support", date: "Jan 5, 2026" },
    //     { title: "Terms & Condition", date: "Jan 5, 2026" },
    //     { title: "Privacy Policy", date: "Jan 5, 2026" },
    // ];
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Content Management'
                description='Manage pages, categories.'
            />
            {/* <div className="flex items-center gap-3 mt-5">
                <div onClick={() => setActiveTab('staticpage')} className={`flex items-center ${activeTab === 'staticpage' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm gap-1 cursor-pointer`}>
                    <span><PanelsTopLeft size={20} /></span>
                    <button>Static Pages</button>
                </div>
                <div onClick={() => setActiveTab('categories')} className={`flex items-center ${activeTab === 'categories' ? 'bg-primary text-white' : 'bg-[#e9e3e3] text-[#A3A3A3]'} px-2 py-1.5 rounded-sm gap-1 cursor-pointer`}>
                    <span><LayoutDashboard /></span>
                    <button>Categories</button>
                </div>
            </div> */}
            {/* {
                activeTab === 'staticpage' && (
                    <div className=" bg-white mt-5 rounded-lg">
                        <div className="p-7">
                            <div className="mb-6">
                                <h1 className="text-lg font-bold text-[#262626]">Static Pages</h1>
                                <p className="text-sm text-[#737373] font-medium">Manage information pages on your platform</p>
                            </div>
                            <div className="mt-4">
                                {pages.map((page, index) => (
                                    <StaticPageItem
                                        key={index}
                                        title={page.title}
                                        modifiedDate={page.date}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            } */}
            {/* {
                activeTab === 'categories' && <Categories />
            } */}
            <Categories />
        </div>
    );
};

export default Content;