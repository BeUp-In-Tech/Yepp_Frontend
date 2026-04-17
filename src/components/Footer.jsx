import React from 'react';
import { images } from '../assets/image';
import { Link, NavLink } from 'react-router-dom';
import QRCodegenerator from './qrcode/QRCodegenerator';

const Footer = () => {
    return (
        <footer className="w-full bg-[#F0F9FF]">
            <div className='px-4 sm:px-6 lg:px-8'>
                <div className="max-w-305 mx-auto pt-8 sm:pt-9">
                    {/* Logo Section */}
                    <div className="mb-8 sm:mb-10 flex justify-start">
                        <Link to="/" className="">
                            <img src={images.logoIocn} className='h-12 w-full' alt="logo" />
                        </Link>
                    </div>

                    <div className="grid gap-8 pb-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
                        <div className="flex flex-col items-start gap-4 sm:flex-row">
                            <div className="shrink-0 border-2 border-[#4BBDCF] p-1.5 rounded-md bg-white">
                                <QRCodegenerator />
                            </div>
                            <div className="flex w-full max-w-md flex-col space-y-3 lg:space-y-5">
                                <p className="text-[#737373] text-base font-medium leading-5.5 max-w-81.5">
                                    Grab the app now and discover discounts around you. Available on iOS and Android.
                                </p>
                                <div className="flex flex-col gap-2 min-[420px]:flex-row">
                                    <Link to='https://play.google.com/store/apps/details?id=com.gamma.scan'>
                                        <img className='w-36 h-12 object-cover' src={images.googleStore} alt="google-play-store" />
                                    </Link>
                                    <Link to='https://apps.apple.com/us/app/scanner-app-genius-scan/id377672876'>
                                        <img className='w-36 h-12 object-cover' src={images.appleStore} alt="apple-play-store" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 lg:justify-self-end'>
                            <div className="flex flex-col space-y-3 text-[#737373] text-base font-semibold">
                                <NavLink to="/about-us" className={({ isActive }) => isActive ? 'text-cyan-600 transition-colors hover:text-cyan-600 ' : 'hover:text-cyan-600 '}>About Us</NavLink>
                                <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'text-cyan-600 transition-colors hover:text-cyan-600 ' : 'hover:text-cyan-600 '}>Contact Us</NavLink>
                                <NavLink to="/help-support" className={({ isActive }) => isActive ? 'text-cyan-600 transition-colors hover:text-cyan-600 ' : 'hover:text-cyan-600 '}>Help & Support</NavLink>
                            </div>
                            <div className="flex flex-col space-y-3 text-[#737373] text-base font-semibold">
                                <NavLink to="/terms-and-conditions" className={({ isActive }) => isActive ? 'text-cyan-600 transition-colors hover:text-cyan-600 ' : 'hover:text-cyan-600 '}>Terms & Condition</NavLink>
                                <NavLink to="/privacy-policy" className={({ isActive }) => isActive ? 'text-cyan-600 transition-colors hover:text-cyan-600 ' : 'hover:text-cyan-600 '}>Privacy Policy</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-cyan-500 py-4 px-4">
                <div className="max-w-305 mx-auto">
                    <p className="text-center text-white text-sm sm:text-left">
                        &copy; {new Date().getFullYear()} Yepp Ads. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
