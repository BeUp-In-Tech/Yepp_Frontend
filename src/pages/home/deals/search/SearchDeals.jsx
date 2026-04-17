import { MapPin } from "lucide-react";
import { DealCardSkeleton } from "../../../../components/skeleton/DealCardSkeleton";
import { useGetDealAllDealsQuery } from "../../../../features/deal/dealApi";
import SearchDealCard from "./SearchDealCard";
import useUserLocation from "../../../../hooks/useUserLocation";
const SearchDeals = ({ searchText }) => {
    const { latitude, longitude } = useUserLocation();
    const { data: allDeals, isLoading } = useGetDealAllDealsQuery({ searchText, longitude, latitude });
    if (isLoading) {
        return <DealCardSkeleton />
    }
    if (allDeals?.length === 0) {
        return <DealCardSkeleton />
    }



    return (
        <div className="bg-gray-50 min-h-[10vh] px-4 py-12.5">
            <div className="max-w-305 mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#262626]">Search Deals</h2>
                    <div className="flex gap-2 items-center text-[#00616F] text-base font-semibold">
                        <MapPin size={18} /> <span>New york, United States</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {allDeals?.data?.deals.map((deal) => (
                        <SearchDealCard key={deal?.deal?._id} deal={deal} />
                    ))}
                    {
                        allDeals?.data?.deals?.length === 0 &&
                        <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                            <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchDeals;