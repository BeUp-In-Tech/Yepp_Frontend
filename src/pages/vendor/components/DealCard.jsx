import { Eye } from "lucide-react";
import Countdown from "../../home/deals/Countdown";
import { Link } from "react-router-dom";

const DealCard = ({ deal }) => {
    const { _id, images, promotedUntil, reguler_price, discount, totalViews, activePromotion } = deal || {};
    const now = new Date();
    const expiredDeal = new Date(deal?.promotedUntil) < now && activePromotion !== null;
    const activeDeal = new Date(deal?.promotedUntil) >= now && activePromotion !== null;
    const newDeal = activePromotion === null;

    return (
        <Link to={`/deal-details/${_id}`} className="block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md">
            <div className="relative h-48 w-full">
                <img
                    src={images[0]}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white shadow-lg text-[#00444E] text-sm font-bold px-1.5 py-1 rounded">
                    <div className="flex items-center gap-1">
                        <Eye size={20} />
                        <span>{String(totalViews || 0).padStart(2, "0")}</span>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {deal.title}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#262626]">
                            ${(reguler_price - ((reguler_price / 100) * discount)).toFixed(2)}
                        </span>

                        <span className="text-sm text-[#A3A3A3] font-medium line-through">
                            ${reguler_price.toFixed(1)}
                        </span>
                    </div>
                    {
                        activeDeal && <Countdown countdown={promotedUntil} />
                    }
                    {
                        expiredDeal && <div className="bg-gray-300 py-0.5 px-2 rounded-sm ml-2 text-sm font-semibold text-gray-600">
                            Expired
                        </div>
                    }
                    {
                        newDeal && <div className="bg-gray-300 py-0.5 px-2 rounded-sm ml-2 text-sm font-semibold text-gray-600">
                            Not Promoted Yet
                        </div>
                    }
                </div>
                <span className="block w-full mt-4 bg-[#4BBDCF] hover:bg-[#72cfdd] text-white text-center font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer">
                    Redeem Now
                </span>
            </div>
        </Link>
    );
};

export default DealCard;
