import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import Notification from './Notification';
import { images } from '../../assets/image';

const BothNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div>
            <nav className="fixed w-full px-4 z-50 bg-[#E0F2FE] py-6">
                <div className="max-w-305 mx-auto flex items-center justify-between relative">
                    <div className="max-w-52.5 sm:max-w-62.5 flex items-center gap-2 cursor-pointer">
                        <Link to="/" className="relative flex items-center justify-center" aria-label="Yepp Ads home">
                            {/* <button className='bg-[#4BBDCF] py-2 px-5 rounded-md text-white'>Logo</button> */}
                            <img src={images.logoIocn} className='h-12 w-full' alt="Yepp Ads" />
                        </Link>
                    </div>
                    <div className='flex justify-between items-center gap-5 lg:gap-20'>
                        <div className="hidden sm:flex items-center space-x-5 lg:space-x-10 rounded-full">
                            <NavLink to='/shop-overview' className={({ isActive }) => isActive ? 'text-base text-[#00616F] font-semibold tracking-wider transition-all duration-300' : 'text-[#A3A3A3] font-semibold tracking-wider transition-all duration-300'}>Dashboard</NavLink>
                            <NavLink to='/my-deals' className={({ isActive }) => isActive ? 'text-base text-[#00616F] font-semibold tracking-wider transition-all duration-300' : 'text-[#A3A3A3] font-semibold tracking-wider transition-all duration-300'}>My Deals</NavLink>
                            <NavLink to='/my-profile' className={({ isActive }) => isActive ? 'text-base text-[#00616F] font-semibold tracking-wider transition-all duration-300' : 'text-[#A3A3A3] font-semibold tracking-wider transition-all duration-300'}>My Profile</NavLink>
                        </div>
                        <div className='hidden sm:block'>
                            <div className='bg-[#4BBDCF] hover:bg-[#3db0c1] px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer'>
                                <img src={images.switchIcon} alt="" aria-hidden="true" />
                                <Link to='/' className='text-[#FFFFFF] text-base font-bold cursor-pointer'>Switch to user mode</Link>
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-5 cursor-pointer mr-16 sm:mr-0'>
                            <button
                                type="button"
                                aria-label={openNotificationModal ? "Close notifications" : "Open notifications"}
                                aria-expanded={openNotificationModal}
                                onClick={() => setOpenNotificationModal(!openNotificationModal)}
                                className={`${openNotificationModal ? 'text-[#4BBDCF] font-bold' : ''}`}
                            ><Bell size={22} aria-hidden="true" /></button>
                        </div>
                    </div>
                    {
                        openNotificationModal && <Notification
                            isOpen={openNotificationModal}
                            setIsOpen={setOpenNotificationModal} />
                    }

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden absolute z-50 right-3">
                        <button
                            type="button"
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isOpen}
                            aria-controls="vendor-mobile-menu"
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none border bg-white font-extrabold text-[#4BBDCF] rounded-full p-1 cursor-pointer">
                            {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu Overlay */}
                <div
                    id="vendor-mobile-menu"
                    className={`sm:hidden absolute left-4 right-4 top-full z-20 overflow-hidden rounded-lg border border-slate-100 bg-white/95 text-black shadow-xl backdrop-blur transition-all duration-300 ease-out
                   ${isOpen ? "mt-3 max-h-96 opacity-100 translate-y-0" : "mt-0 max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}
                    ref={menuRef}>
                    <div className="flex flex-col gap-2 p-3">
                        <NavLink
                            to="/shop-overview"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-[#00616F]" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-[#00616F]"}`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/my-deals"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-[#00616F]" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-[#00616F]"}`
                            }
                        >
                            My Deals
                        </NavLink>
                        <NavLink
                            to="/my-profile"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-[#00616F]" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-[#00616F]"}`
                            }
                        >
                            My Profile
                        </NavLink>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-[#00616F]" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-[#00616F]"}`
                            }
                        >
                            Switch to user mode
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default BothNavbar;
