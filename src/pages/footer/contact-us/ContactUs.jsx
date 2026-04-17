import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PeragraphContent from '../../../components/info/PeragraphContent';

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return (
        <div className="bg-gray-50 min-h-[calc(100vh-50px)] px-4 pt-36">
            <div className="max-w-305 mx-auto">
                <h1 className="text-xl font-bold text-[#00616F] mb-4">Contact Us</h1>
                <PeragraphContent>
                    We'd love to hear from you!<br />
                    Whether you have questions, need assistance, or want to share feedback about "App Name", we're here to help.
                </PeragraphContent>

                <h2 className="text-lg font-extrabold mb-3 text-[#262626]">How to Reach Us</h2>

                <ul className="space-y-6 mb-8">
                    <li className="list-disc ml-8">
                        <span className="font-bold">Email:</span>
                        <PeragraphContent>
                            For general inquiries or support, feel free to email us at
                            <span className="text-gray-600"> [support@appname.com]</span>.
                            We aim to respond within 24 hours.
                        </PeragraphContent>
                    </li>
                    <li className="list-disc ml-8">
                        <span className="font-bold">Phone:</span>
                        <PeragraphContent>
                            Prefer speaking to someone? Call us at <span className="text-gray-600">[phone number]</span> during our business hours:<br />
                            Monday to Friday: 9:00 AM – 6:00 PM (GMT).
                        </PeragraphContent>
                    </li>
                </ul>
                <div className="mb-8">
                    <h2 className="text-lg font-extrabold mb-3 text-[#262626]">Mailing Address</h2>
                    <PeragraphContent>
                        If you'd prefer to send us Link letter, you can reach us at:
                    </PeragraphContent>
                    <div className="text-[#262626]">
                        <p>[Your Company's Mailing Address]</p>
                        <p>[City, State, ZIP Code]</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-extrabold mb-3 text-[#262626]">Social Media</h2>
                    <PeragraphContent>
                        Connect with us on social media for updates, promotions, and exciting deals:
                    </PeragraphContent>
                    <ul className="space-y-1 ml-7">
                        <li className="list-disc">
                            <Link to="#" className="underline hover:text-teal-700 transition-colors">Facebook</Link>
                        </li>
                        <li className="list-disc">
                            <Link to="#" className="underline hover:text-teal-700 transition-colors">Twitter</Link>
                        </li>
                        <li className="list-disc">
                            <Link to="#" className="underline hover:text-teal-700 transition-colors">Instagram</Link>
                        </li>
                        <li className="list-disc">
                            <Link to="#" className="underline hover:text-teal-700 transition-colors">LinkedIn</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;