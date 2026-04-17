import { Link } from "react-router-dom";
import Countdown from "../home/deals/Countdown";
import { Store, Trash } from "lucide-react";

const WishListCard = ({ deal, handleDeleteWistListId }) => {
    const {
        _id, title, reguler_price, discount, promotedUntil, shop, activePromotion } = deal || {};
    const image = deal?.images?.[0];
    const now = new Date();

    const expiredDeal = new Date(deal?.promotedUntil) < now && activePromotion !== null;
    const activeDeal = new Date(deal?.promotedUntil) >= now && activePromotion !== null;

    const handleWishListId = (id) => {
        handleDeleteWistListId(id);
    };

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
                <div className="flex justify-between">
                    <div className="absolute top-3 left-3 bg-[#A8EBF7] text-[#00444E] text-xs font-bold px-2 py-1 rounded">
                        {discount}% off</div>
                    <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded
                         ${new Date(promotedUntil) < now ? 'bg-[#e9e2e2] text-[#737373]' : 'bg-[#A8EBF7] text-[#00444E]'}`}> {new Date(promotedUntil) < now ? 'Expired' : 'Available'}
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[#262626] line-clamp-2 leading-tight">
                        {deal.title}
                    </h3>
                    <div className="text-right cursor-pointer" onClick={() => handleWishListId(deal?._id)}>
                        <Trash className="text-[#262626]" size={20} />
                    </div>
                </div>

                <div className="flex items-center gap-1 mt-2 text-[#A3A3A3] text-sm">
                    <span className="opacity-70"><Store size={17} className="text-[#A3A3A3]" /></span>
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
                    {
                        activeDeal && <Countdown countdown={promotedUntil} />
                    }
                    {
                        expiredDeal && <div className="bg-gray-300 py-0.5 px-2 rounded-sm ml-2 text-sm font-semibold text-gray-600">
                            Expired
                        </div>
                    }
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

export default WishListCard;