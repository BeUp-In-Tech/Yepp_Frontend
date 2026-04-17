import React from 'react';
import { images } from '../assets/image';
import { Link, NavLink } from 'react-router-dom';
import QRCodegenerator from './qrcode/QRCodegenerator';

const Footer = () => {
    return (
        <footer className="w-full bg-[#F0F9FF]">
            <div className='px-4'>
                <div className="max-w-305 mx-auto pt-9">
                    {/* Logo Section */}
                    <div className="mb-10 flex justify-start">
                        <Link to="/" className="">
                            <img src={images.logoIocn} className='h-12 w-full' alt="logo" />
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between pb-8">
                        <div className="flex flex-col sm:flex-row items-start space-x-2">
                            <div className="border-2 border-[#4BBDCF] p-1.5 rounded-md bg-white">
                                <QRCodegenerator />
                            </div>
                            <div className="flex flex-col space-y-3 lg:space-y-5 mt-4 sm:mt-0">
                                <p className="text-[#737373] text-base font-medium leading-5.5 max-w-81.5">
                                    Grab the app now and discover discounts around you. Available on iOS and Android.
                                </p>
                                <div className="flex space-x-2">
                                    <Link to='https://play.google.com/store/apps/details?id=com.gamma.scan'>
                                        <img className='w-36 h-12 object-cover' src={images.googleStore} alt="google-play-store" />
                                    </Link>
                                    <Link to='https://apps.apple.com/us/app/scanner-app-genius-scan/id377672876'>
                                        <img className='w-36 h-12 object-cover' src={images.appleStore} alt="apple-play-store" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between gap-5 lg:gap-10 mt-5 md:mt-0'>
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
                        <div className='flex flex-col sm:flex-row justify-between gap-5 lg:gap-10 mt-5 md:mt-0'>
                            <div>
                                <h4 className="font-semibold text-xl text-[#000000] mb-4">Follow us on</h4>
                                <div className="flex space-x-4 items-center">
                                    <NavLink to='https://www.facebook.com'>
                                        <img className='h-6 w-6' src={images.facebook} alt="Facebook" />
                                    </NavLink>
                                    <NavLink to='https://www.youtube.com/'>
                                        <img className='h-6 w-6' src={images.instagram} alt="Instagram" />
                                    </NavLink>
                                    <NavLink to='https://www.youtube.com/'>
                                        <img className='h-6 w-6' src={images.youtube} alt="Youtube" />
                                    </NavLink>
                                    <NavLink to='https://www.youtube.com/'>
                                        <img className='h-6 w-6' src={images.linkdlen} alt="LinkedIn" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-cyan-500 py-4 px-4">
                <div className="max-w-305 mx-auto">
                    <p className="text-white text-sm">
                        © {new Date().getFullYear()} App Name. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
