import { Link, useParams } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight, Store, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Redeem from './components/Redeem';
import ShowCuponModal from '../../components/modal/ShowCuponModal';
import Countdown from '../home/deals/Countdown';
import { useGetDealDetailsQuery } from '../../features/deal/dealApi';
import DealDetailsSkeleton from '../../components/skeleton/DealDetailsSkeleton';
import toast from 'react-hot-toast';
import useUserLocation from '../../hooks/useUserLocation';
import CopiedLink from './components/CopiedLink';
import OutLetshowMap from './OutLetshowMap';

const DealDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const { latitude, longitude } = useUserLocation();
    const { data: deal, isLoading } = useGetDealDetailsQuery({ id, longitude, latitude });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return <DealDetailsSkeleton />
    }

    const { _id, title, images, highlight, description, reguler_price, discount, promotedUntil, shop, available_outlet, tags } = deal?.data || {};

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleSaveForLater = (id) => {
        const savedIds = JSON.parse(localStorage.getItem("saveForLater")) || [];
        if (!savedIds.includes(id)) {
            savedIds.push(id);
            localStorage.setItem("saveForLater", JSON.stringify(savedIds));
            toast.success("Successfully Added!");
        } else {
            toast.error("Already Added!");
        }
    };

    const price = Number(reguler_price);
    const disc = Number(discount);

    const finalPrice = price - (price * disc) / 100;

    

    return (
        <div className='bg-white pt-40 px-4'>
            <div className="max-w-305 mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* left side */}
                    <div className="w-full lg:w-6/12 space-y-6">
                        <div className="relative group rounded-lg overflow-hidden">
                            <img
                                src={images[currentImageIndex]}
                                alt="Profile"
                                className="w-full h-92.5 object-cover transition-all duration-500" />
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all">
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all">
                                <ChevronRight size={24} />
                            </button>
                            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-base">
                                {currentImageIndex + 1}/{images?.length}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#262626] leading-tight">
                                {title}
                            </h1>

                            <div className="flex items-center gap-1">
                                <Store size={18} className='text-[#525252]' />
                                <Link to={`/vendor-details/${shop?._id}`} className="flex items-center gap-1 group cursor-pointer">
                                    <span className="font-semibold text-lg text-[#525252] transition-transform duration-300 group-hover:translate-x-1">
                                        {shop?.business_name}
                                    </span>
                                    <ArrowRight size={20} className="text-[#525252] mt-1 transition-transform duration-300 group-hover:translate-x-2" />

                                </Link>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="text-[#007E8E] font-medium text-lg">
                                    <span className="text-[#007E8E] font-medium text-lg">{deal?.data.available_outlet[0]?.address}</span>
                                    <span className="text-3xl ml-2">•</span>
                                    <span> {(deal?.data.available_outlet[0]?.distance / 1000).toFixed(2)} Km away</span>
                                </div>
                                <CopiedLink _id={_id} />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className='space-x-4'>
                                    <span className="text-4xl text-[#262626] font-bold">
                                        ${finalPrice.toFixed(2)}
                                    </span>

                                    <span className="text-xl text-[#A3A3A3] line-through">
                                        ${price.toFixed(2)}
                                    </span>
                                    <span className="bg-cyan-100 text-[#00444E] px-2 py-1 rounded-md font-bold">{discount}% off</span>
                                </div>
                                <div className='mt-2'>
                                    <Countdown countdown={promotedUntil} />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button onClick={() => handleSaveForLater(_id)} className="flex items-center gap-2 px-10 py-3 border border-[#4BBDCF] text-[#4BBDCF] rounded-full font-bold hover:bg-cyan-50 transition-colors cursor-pointer">
                                    Save For Later <Heart size={22} />
                                </button>
                                <button onClick={() => setIsOpen(true)} className="flex-1 py-3 bg-[#4BBDCF] text-white rounded-full font-bold hover:bg-cyan-500 shadow-md transition-colors cursor-pointer">
                                    Show Coupon
                                </button>
                            </div>

                            <ShowCuponModal
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                deal={deal}
                            />
                            <div className="pb-8 pt-2">
                                <h3 className="font-bold text-2xl text-[#262626] mb-3">Location</h3>
                                <div className="rounded-xl overflow-hidden border border-gray-400 h-70">
                                    <OutLetshowMap locations={available_outlet} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="w-full lg:w-5/12">
                        <section>
                            <h3 className="font-bold text-xl text-[#262626] mb-2">How to Redeem</h3>
                            <Redeem />
                        </section>
                        <section>
                            <h3 className="font-bold text-xl text-[#262626] mb-2">Highlight</h3>
                            <ul className="space-y-2">
                                {highlight.map((text, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[#262626] text-base">
                                        <span className="h-1.5 w-1.5 bg-[#6e6a6a] rounded-full" /> {text}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-xl text-[#262626] mb-2 mt-4">Tags</h3>
                            <ul className="space-y-2">
                                {tags.map((text, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[#262626] text-base">
                                        <span className="h-1.5 w-1.5 bg-[#6e6a6a] rounded-full" /> {text}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        {/* Description & Included */}
                        <section className="space-y-4 mt-4">
                            <h3 className="font-bold text-xl text-[#262626] mb-2">Description</h3>
                            <p className="text-base text-[#262626] leading-relaxed">
                                {description}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealDetails;