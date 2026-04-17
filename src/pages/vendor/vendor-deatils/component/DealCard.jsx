import { Store } from "lucide-react";
import Countdown from "../../../home/deals/Countdown";
import { Link } from "react-router-dom";

const DealCard = ({ deal, businessName }) => {
    const { _id, images, promotedUntil, reguler_price, discount } = deal || {};
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md">
            <div className="relative h-48 w-full">
                <img
                    src={images[0]}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#A8EBF7] text-[#00444E] text-xs font-bold px-2 py-1 rounded">
                    {discount}% off
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {deal.title}
                </h3>
                <div className="flex items-center gap-1 text-[#A3A3A3] text-sm">
                    <span className="opacity-70"><Store size={17} className="text-[#A3A3A3]" /></span>
                    <span>{businessName}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#262626]">
                            ${(reguler_price - ((reguler_price / 100) * discount)).toFixed(2)}
                        </span>

                        <span className="text-sm text-[#A3A3A3] font-medium line-through">
                            ${reguler_price.toFixed(1)}
                        </span>
                    </div>
                    <Countdown countdown={promotedUntil} />
                </div>
                {/* Action Button */}
                <Link to={`/deal-details/${_id}`}>
                    <button className="w-full mt-4 bg-[#4BBDCF] hover:bg-[#72cfdd] text-white font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer">
                        Redeem Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DealCard;