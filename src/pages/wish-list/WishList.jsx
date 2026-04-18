import { useEffect, useState } from "react";
import TabSection from "./TabSection";
import WishListCard from "./WishListCard";
import { useGetAllSaveDealsQuery } from "../../features/deal/dealApi";
import { DealCardSkeleton } from "../../components/skeleton/DealCardSkeleton";
import Pagination from "../vendor/created-shop/components/Pagination";
import toast from "react-hot-toast";
const ROWS_PER_PAGE = import.meta.env.VITE_ROWS_PER_PAGE;

const WishList = () => {
    const [saveIds, setSaveIds] = useState(
        JSON.parse(localStorage.getItem("saveForLater")) || []
    );
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const { data: totalDeals, isLoading } = useGetAllSaveDealsQuery(saveIds, {
        skip: saveIds.length === 0,
    });
    const now = new Date();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const handleDeleteWistListId = (id) => {
        const updatedIds = saveIds.filter(saveId => saveId !== id);
        setSaveIds(updatedIds);
        localStorage.setItem("saveForLater", JSON.stringify(updatedIds));
        window.dispatchEvent(new Event("savedDealsUpdated"));
        toast.success("Removed successfully!");
    };

    if (isLoading) {
        return <DealCardSkeleton />
    }


    const allDeals = totalDeals?.data ?? [];
    const expiredDeals = allDeals.filter(deal => new Date(deal?.promotedUntil) < now);
    const availableDeals = allDeals.filter(deal => new Date(deal?.promotedUntil) >= now);
    const totalPages = Math.ceil(allDeals?.length / ROWS_PER_PAGE);
    const indexOfFirst = (currentPage - 1) * ROWS_PER_PAGE;
    const indexOfLast = Math.min(currentPage * ROWS_PER_PAGE, allDeals?.length);
    const currentDeals = allDeals.slice(indexOfFirst, indexOfLast);

    return (
        <div className="bg-white px-4 pt-56 pb-12.5">
            <TabSection
                activeTab={activeTab}
                setActiveTab={setActiveTab} />
            {
                activeTab === 'All' && (
                    <div className="max-w-305 mx-auto pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentDeals?.map((deal, index) => (
                                <WishListCard key={index} deal={deal} handleDeleteWistListId={handleDeleteWistListId} />
                            ))}
                            {
                                allDeals?.length === 0 &&
                                <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                                    <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                                </div>
                            }
                        </div>
                        <Pagination
                            totalPages={totalPages}
                            totalItems={allDeals?.length}
                            rowsPerPage={ROWS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            indexOfFirst={indexOfFirst}
                            indexOfLast={indexOfLast}
                        />
                    </div>
                )
            }
            {
                activeTab === 'Available' && (
                    <div className="max-w-305 mx-auto pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {availableDeals?.map((deal, index) => (
                                <WishListCard key={index} deal={deal} handleDeleteWistListId={handleDeleteWistListId} />
                            ))}
                            {
                                availableDeals?.length === 0 &&
                                <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                                    <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                                </div>
                            }
                        </div>
                    </div>
                )
            }
            {
                activeTab === 'Expired' && (
                    <div className="max-w-305 mx-auto pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {expiredDeals?.map((deal, index) => (
                                <WishListCard key={index} deal={deal} handleDeleteWistListId={handleDeleteWistListId} />
                            ))}
                            {
                                expiredDeals?.length === 0 &&
                                <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                                    <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default WishList;
