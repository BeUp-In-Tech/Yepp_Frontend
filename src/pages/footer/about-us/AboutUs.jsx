import { useEffect } from "react";
import PeragraphContent from "../../../components/info/PeragraphContent";

const AboutUs = () => {
    const appName = "App Name";
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return (
        <div className="bg-gray-50 min-h-[calc(100vh-50px)] px-4 pt-36">
            <div className="max-w-305 mx-auto">
                <header className="">
                    <h1 className="text-xl font-bold text-[#00616F] mb-4">About Us</h1>
                    <PeragraphContent>
                        Welcome to <span>"{appName}"</span>, your go-to platform for discovering
                        the best local deals, exclusive offers, and exciting experiences! Our mission is to bring you the
                        best discounts and unique opportunities, tailored specifically to your interests and location.
                    </PeragraphContent>
                    <PeragraphContent>
                        At <span>"{appName}"</span>, we believe that saving money should be simple
                        and rewarding. Whether you're looking for a delicious meal at your favorite restaurant, a relaxing
                        spa day, or an adventure-packed experience, we've got you covered. Our platform is designed to help
                        you find the best deals near you with just a few clicks.
                    </PeragraphContent>
                </header>
                <section className="">
                    <h2 className="text-lg font-extrabold mb-3 text-[#262626]">Our Vision</h2>
                    <PeragraphContent>
                        To revolutionize how people discover and enjoy local deals, by providing an intuitive,
                        user-friendly platform that connects consumers with businesses offering valuable
                        experiences and services.
                    </PeragraphContent>
                </section>
                <section className="mb-6">
                    <h2 className="text-lg font-extrabold mb-3 text-[#262626]">What We Offer</h2>
                    <ul className="list-disc ml-10 space-y-3 text-base leading-relaxed">
                        <li>
                            <span>Exclusive Deals:</span> Save on dining, wellness, fitness, and entertainment with exclusive offers from top-rated merchants.
                        </li>
                        <li>
                            <span>Personalized Recommendations:</span> Browse curated deals based on your preferences and location.
                        </li>
                        <li>
                            <span>Seamless Redemption:</span> Redeem deals with ease through QR codes or manual codes at participating merchants.
                        </li>
                        <li>
                            <span>Loyalty & Rewards:</span> Enjoy our loyalty program and earn rewards for every deal you redeem.
                        </li>
                    </ul>
                </section>
                <section className="mb-4 text-[#262626]">
                    <h2 className="text-xl font-bold mb-3">Our Promise</h2>
                    <PeragraphContent>
                        At <span>"{appName}"</span>, we are committed to providing a seamless
                        experience, where discovering great deals is easy and rewarding. We work closely with local
                        businesses to bring you the best offers, ensuring that every deal on our platform is a
                        valuable opportunity to save and enjoy.
                    </PeragraphContent>
                </section>
                <footer className="mt-6">
                    <PeragraphContent>
                        Thank you for choosing {appName}. We are excited to help you discover, redeem, and enjoy the best local deals near you.
                    </PeragraphContent>
                </footer>
            </div>
        </div>
    );
};

export default AboutUs;
