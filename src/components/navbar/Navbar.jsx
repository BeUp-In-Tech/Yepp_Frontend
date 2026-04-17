import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import { Bell, Heart, Menu, X } from 'lucide-react';
import Notification from './Notification';
import { images } from '../../assets/image';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import Cookies from "js-cookie";
import { persistor } from '../../app/store';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const menuRef = useRef(null);
    const isAuthenticated = useAuth();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state?.auth);


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

    const hanldeLogOut = async () => {
        dispatch(userLoggedOut());

        Cookies.remove("accessToken", {
            secure: false,
            sameSite: "Strict",
            path: "/",
        });

        Cookies.remove("refreshToken", {
            secure: false,
            sameSite: "Strict",
            path: "/",
        });

        toast.success("Logout successfully");

        await persistor.flush();
        await persistor.purge();
    }

    return (
        <div>
            <nav className="fixed w-full px-4 z-50 bg-[#E0F2FE] py-5">
                <div className="max-w-305 mx-auto flex items-center justify-between relative">
                    <div className="max-w-52.5 sm:max-w-62.5 flex items-center gap-2 cursor-pointer">
                        <Link to="/" className="relative flex items-center justify-center" aria-label="Yepp Ads home">
                            {/* <button className='bg-[#4BBDCF] py-2 px-5 rounded-md text-white'>Logo</button> */}
                            <img src={images.logoIocn} className='h-12 w-full' alt="Yepp Ads" />
                        </Link>
                    </div>

                    <div className='flex justify-between items-center gap-20'>
                        <div className={`hidden md:flex items-center ${user?.role === 'ADMIN' || user?.role === 'VENDOR' ? 'space-x-0' : 'space-x-3'} rounded-full`}>
                            {
                                isAuthenticated ? '' : <p className='text-lg text-[#00616F] font-semibold tracking-wider transition-all duration-300'>Interested in becoming a vendor?</p>
                            }
                            {
                                isAuthenticated ?
                                    <button
                                        onClick={hanldeLogOut}
                                        className={`bg-[#52bad1] hover:bg-[#46a5ba] text-base text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2.5 cursor-pointer 
                                        ${(user?.role === 'ADMIN' || user?.role === 'VENDOR') ? 'rounded-l-full' : 'rounded-full'}`}
                                    >
                                        LogOut
                                    </button>
                                    :
                                    <NavLink
                                        to='/login'
                                        className='bg-[#4BBDCF] hover:bg-[#46a5ba] text-base text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2 rounded-full cursor-pointer'
                                    >
                                        Sign In
                                    </NavLink>
                            }
                            {
                                user?.role === 'ADMIN' && <NavLink to='/dashboard/admin-dashboard' className='bg-[#52bad1] hover:bg-[#46a5ba] text-base text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2.5 rounded-r-full cursor-pointer'>Dashboard</NavLink>
                            }
                            {
                                user?.role === 'VENDOR' && <NavLink to='/shop-overview' className='bg-[#52bad1] hover:bg-[#46a5ba] text-base text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2.5 rounded-r-full cursor-pointer'>Dashboard</NavLink>
                            }
                        </div>
                        <div className='flex justify-center items-center gap-5 cursor-pointer mr-16 md:mr-0'>
                            <NavLink to='/wish-list' aria-label="View wishlist" className={({ isActive }) => isActive ? 'text-[#4BBDCF] font-bold' : ''}>
                                <Heart size={22} aria-hidden="true" />
                            </NavLink>
                            {
                                user?.role === 'VENDOR' && <button
                                    type="button"
                                    aria-label={openNotificationModal ? "Close notifications" : "Open notifications"}
                                    aria-expanded={openNotificationModal}
                                    onClick={() => setOpenNotificationModal(!openNotificationModal)}
                                    className={`${openNotificationModal ? 'text-[#4BBDCF] font-bold' : ''}`}>
                                    <Bell size={22} aria-hidden="true" />
                                </button>
                            }
                        </div>
                    </div>
                    {
                        openNotificationModal && <Notification
                            isOpen={openNotificationModal}
                            setIsOpen={setOpenNotificationModal} />
                    }

                    {/* Mobile Menu Button */}
                    <div className="md:hidden absolute z-50 right-3">
                        <button
                            type="button"
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isOpen}
                            aria-controls="main-mobile-menu"
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none border bg-white font-extrabold text-[#4BBDCF] rounded-full p-1">
                            {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu Overlay */}
                <div
                    id="main-mobile-menu"
                    className={`md:hidden overflow-hidden transition-all duration-600 ease-in-out absolute top-0 right-0 z-20 bg-white text-black w-full
                   ${isOpen ? "h-80 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"}`}
                    ref={menuRef}>
                    <div className="mt-4 p-4 flex flex-col text-black space-y-4 pt-5">
                        <NavLink to="/dashboard/dashboardHome" className="text-base font-semibold tracking-wider">
                            Landlords
                        </NavLink>
                        <NavLink to="/register" className="text-base font-semibold tracking-wider">
                            Management
                        </NavLink>
                        <NavLink to="/login" className="text-base font-semibold tracking-wider">
                            Applicants
                        </NavLink>
                    </div>
                </div>
            </nav>
            <CategoryHeader />
        </div>
    );
};

export default Navbar;
