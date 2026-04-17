import { Store } from "lucide-react";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";

const DealCard = ({ deal }) => {
    const {
        _id, title, reguler_price, discount, distance, promotedUntil, shop } = deal || {};
    const image = deal?.images?.[0];
    const price = Number(reguler_price);
    const discountAmount = (price * Number(discount)) / 100;
    const finalPrice = price - discountAmount;
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md">
            <div className="relative h-48 w-full">
                <img
                    src={image || "/no-image.png"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#A8EBF7] text-[#00444E] text-xs font-bold px-2 py-1 rounded">
                    {discount}% off
                </div>
                <div className="absolute bottom-3 left-3 text-white text-xs bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    • {(distance / 1000).toFixed(2)} km away
                </div>
            </div>

            <div className="px-2 pt-4 pb-2">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {deal.title}
                </h3>

                <div className="flex items-center gap-1 mt-2 text-[#A3A3A3] text-sm">
                    <span className="opacity-70"><Store size={17} className="text-[#A3A3A3]" aria-hidden="true" /></span>
                    <span>{shop?.business_name}</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#262626]">
                            ${finalPrice.toFixed(2)}
                        </span>

                        <span className="text-sm text-[#A3A3A3] font-medium line-through">
                            ${price.toFixed(2)}
                        </span>
                    </div>
                    <div className="">
                        <Countdown countdown={promotedUntil} />
                    </div>
                </div>

                {/* Action Button */}
                <Link
                    to={`/deal-details/${_id}`}
                    className="block w-full mt-4 bg-[#4BBDCF] hover:bg-[#72cfdd] text-white text-center font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer"
                >
                    Redeem Now
                </Link>
            </div>
        </div>
    );
};

export default DealCard;

