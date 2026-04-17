import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import Countdown from "../../../../home/deals/Countdown";
import { useHandleDeleteDealMutation } from "../../../../../features/deal/dealApi";
import toast from "react-hot-toast";
import { useState } from "react";

const DealCard = ({ deal }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { discount, promotedUntil, reguler_price, activePromotion } = deal || {};
    const [handleDeleteDeal, { isLoading }] = useHandleDeleteDealMutation();
    const now = new Date();
    const expiredDeal = new Date(deal?.promotedUntil) < now && activePromotion !== null;
    const activeDeal = new Date(deal?.promotedUntil) >= now && activePromotion !== null
    const newDeal = activePromotion === null;

    const openConfirm = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleDealDelete = async (id) => {
        try {
            const res = await handleDeleteDeal(id).unwrap();

            if (res?.success) {
                toast.success(res?.message || "Deal deleted successfully");
                setShowConfirm(false);
            } else {
                toast.error(res?.message || "Something went wrong");
            }

        } catch (error) {
            console.error("Delete failed:", error);

            toast.error(
                error?.data?.message || "Delete failed. Please try again"
            );
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center mt-5">
            <div className="w-full sm:w-32 h-40 sm:h-24 rounded-lg overflow-hidden shrink-0">
                <img
                    src={deal?.images[0]}
                    alt="Treatment"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#262626] text-base leading-tight w-full">
                        {deal.title}
                    </h3>
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-2 lg:gap-3">
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <div className="flex items-center gap-0.5 mt-1 text-gray-400 text-sm">
                                <Store size={17} />
                                <span className="text-sm"></span> {deal?.shop?.business_name}
                            </div>
                            <div className="mt-3 flex items-center justify-between gap-3">
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
                                        Not Promoted Deal Yet
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            activeDeal && <div className="flex items-center gap-2">
                                <Link
                                    to={`/vendor-edit-deal/${deal?._id}`}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        Update
                                    </span>
                                </Link>
                                <button
                                    onClick={() => openConfirm(deal?._id)}
                                    disabled={isLoading}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400 disabled:opacity-50">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        {isLoading ? "Deleting..." : "Delete"}
                                    </span>
                                </button>
                            </div>
                        }
                        {
                            newDeal && <div className="flex items-center gap-2">
                                <Link
                                    to={`/create-deal-plan/${deal?._id}`}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        Active
                                    </span>
                                </Link>
                                <Link
                                    to={`/vendor-edit-deal/${deal?._id}`}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        Update
                                    </span>
                                </Link>
                                <button
                                    onClick={() => openConfirm(deal?._id)}
                                    disabled={isLoading}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400 disabled:opacity-50">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        {isLoading ? "Deleting..." : "Delete"}
                                    </span>
                                </button>
                            </div>
                        }
                        {
                            expiredDeal && <div className="flex items-center gap-2">
                                <Link
                                    to={`/create-deal-plan/${deal?._id}`}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        Reactivate
                                    </span>
                                </Link>
                                <Link
                                    to={`/vendor-edit-deal/${deal?._id}`}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        Update
                                    </span>
                                </Link>
                                <button
                                    onClick={() => openConfirm(deal?._id)}
                                    disabled={isLoading}
                                    className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400 disabled:opacity-50">
                                    <span className="absolute inset-0 bg-[#3db8c1] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                        {isLoading ? "Deleting..." : "Delete"}
                                    </span>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-87.5 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Are you sure?
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                onClick={() => handleDealDelete(selectedId)}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DealCard;