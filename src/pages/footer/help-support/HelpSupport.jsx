import React, { useEffect } from 'react';
import { Mail, Phone, Info, Lightbulb, Settings } from 'lucide-react';
import PeragraphContent from '../../../components/info/PeragraphContent';

const HelpSupport = () => {
    useEffect(() => {
            window.scrollTo(0, 0)
        }, []);
    return (
        <div className='bg-gray-50 h-min-screen px-4 pt-36 pb-10'>
            <div className="max-w-305 mx-auto">
                <header className="mb-8">
                    <h1 className="text-xl font-bold text-[#00616F] mb-4">Help & Support</h1>
                    <PeragraphContent>
                        We are here to assist you with any questions or issues you may have while using App Name.
                        Below are the available support options:
                    </PeragraphContent>
                </header>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-lg font-extrabold mb-3 text-[#262626]">Need Assistance?</h2>
                        <PeragraphContent>
                            If you have any questions or need support, you can reach us through the following:
                        </PeragraphContent>
                        <p className="text-sm mb-4"></p>
                        <ul className="space-y-1 ml-4 list-disc list-outside text-base">
                            <li className="flex items-start gap-2">
                                <span className="text-slate-400 mt-1">•</span>
                                <div>
                                    <span className="font-semibold block">Email Support:</span>
                                    <PeragraphContent>
                                        For detailed inquiries or assistance, email us at {' '}
                                        <a href="mailto:support@appname.com" className="text-teal-700 hover:underline">[support@appname.com]</a>.
                                        We strive to respond to all emails within 24 hours.
                                    </PeragraphContent>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slate-400 mt-1">•</span>
                                <div>
                                    <span className="font-semibold block">Phone Support:</span>
                                    <PeragraphContent>
                                        If you prefer speaking to a customer service representative, give us a call at {' '}
                                        <span className="font-medium text-teal-700">[phone number]</span>. Our hours of operation are:
                                        <br />
                                        Monday – Friday: 9:00 AM – 6:00 PM (GMT).
                                    </PeragraphContent>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-lg font-extrabold mb-3 text-[#262626]">Report an Issue</h2>
                        <PeragraphContent>
                            If you're experiencing a technical issue or error with the app, please let us know by:
                        </PeragraphContent>
                        <ul className="space-y-1 ml-6 list-disc list-outside text-sm">
                            <li>
                                Emailing: <a href="mailto:support@appname.com" className="text-teal-700 hover:underline">[support@appname.com]</a> with a description of the problem.
                            </li>
                            <li>Phone: Contact us directly for immediate assistance.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-lg font-extrabold mb-3 text-[#262626]">Troubleshooting Tips</h2>
                        <PeragraphContent>
                            If you're facing issues with the app, here are some quick steps to try:
                        </PeragraphContent>
                        <ul className="space-y-1 ml-6 list-disc list-outside text-base">
                            <li><span className="font-medium">Check for Updates:</span> Make sure you have the latest version of the app installed.</li>
                            <li><span className="font-medium">Restart the App:</span> Close and reopen the app to see if the issue persists.</li>
                            <li><span className="font-medium">Check Your Connection:</span> Ensure your internet connection is stable.</li>
                            <li><span className="font-medium">Clear Cache (if applicable):</span> Try clearing the cache in your app settings for improved performance.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-lg font-extrabold mb-3 text-[#262626]">Feedback & Suggestions</h2>
                        <PeragraphContent>
                            We value your input! If you have any feedback or suggestions for improving App Name,
                            feel free to send them to <a href="mailto:feedback@appname.com" className="text-teal-700 hover:underline">[feedback@appname.com]</a>.
                            Your suggestions help us enhance your experience.
                        </PeragraphContent>
                    </section>
                </div>
            </div>
        </div>

    );
};

export default HelpSupport;