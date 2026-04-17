import { Store } from "lucide-react";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";

const DealCard = ({ deal, compact = false, imageSize = "normal" }) => {
    const {
        _id, title, reguler_price, discount, distance, promotedUntil, shop
    } = deal || {};
    const image = deal?.images?.[0];
    const price = Number(reguler_price) || 0;
    const discountAmount = (price * (Number(discount) || 0)) / 100;
    const finalPrice = price - discountAmount;
    const dealDistance = Number(distance) || 0;

    if (compact) {
        const imageHeight = imageSize === "tall" ? "h-56 min-[501px]:h-44" : "h-36 min-[501px]:h-44";

        return (
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-hover hover:shadow-md">
                <div className={`relative w-full ${imageHeight}`}>
                    <img
                        src={image || "/no-image.png"}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute left-2 top-2 rounded bg-[#A8EBF7] px-2 py-1 text-xs font-bold text-[#00444E]">
                        {discount}% off
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-medium text-white">
                        <span aria-hidden="true">&bull;</span>
                        <span>{(dealDistance / 1000).toFixed(1)} km away</span>
                    </div>
                </div>

                <div className="px-2 pb-2 pt-2">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#262626] sm:text-base">
                        {title}
                    </h3>

                    <div className="mt-2 flex min-w-0 items-center gap-1 text-xs text-[#A3A3A3] sm:text-sm">
                        <Store size={14} className="shrink-0 text-[#A3A3A3]" aria-hidden="true" />
                        <span className="min-w-0 truncate">{shop?.business_name}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-baseline gap-1">
                            <span className="text-lg font-bold text-[#262626] sm:text-xl">
                                ${finalPrice.toFixed(0)}
                            </span>

                            <span className="text-xs font-medium text-[#A3A3A3] line-through sm:text-sm">
                                ${price.toFixed(0)}
                            </span>
                        </div>
                        <Countdown countdown={promotedUntil} compact />
                    </div>

                    <Link
                        to={`/deal-details/${_id}`}
                        className="mt-3 block w-full rounded-full bg-[#4BBDCF] py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#72cfdd]"
                    >
                        Redeem Now
                    </Link>
                </div>
            </article>
        );
    }

    return (
        <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md">
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
                    &bull; {(dealDistance / 1000).toFixed(2)} km away
                </div>
            </div>

            <div className="px-2 pt-4 pb-2">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {title}
                </h3>

                <div className="flex items-center gap-1 mt-2 text-[#A3A3A3] text-sm">
                    <Store size={17} className="text-[#A3A3A3]" aria-hidden="true" />
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
                    <Countdown countdown={promotedUntil} />
                </div>

                <Link
                    to={`/deal-details/${_id}`}
                    className="block w-full mt-4 bg-[#4BBDCF] hover:bg-[#72cfdd] text-white text-center font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer"
                >
                    Redeem Now
                </Link>
            </div>
        </article>
    );
};

export default DealCard;
