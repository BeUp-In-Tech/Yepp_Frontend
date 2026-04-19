import { useState } from 'react';
import { useGetAllDealQuery } from '../../../features/deal/dealApi';
import { DealCardSkeleton } from '../../../components/skeleton/DealCardSkeleton';
import DealCard from './DealCard';
import Pagination from '../../vendor/created-shop/components/Pagination';
import useUserLocation from '../../../hooks/useUserLocation';
import DynamicLocation from '../../../components/location/DynamicLocation';
const ROWS_PER_PAGE = import.meta.env.VITE_ROWS_PER_PAGE;

const Deals = () => {
    const { latitude, longitude } = useUserLocation();
    const { data: totalDeals, isLoading } = useGetAllDealQuery({ latitude, longitude });
    const [currentPage, setCurrentPage] = useState(1);
    
    if (isLoading) {
        return <DealCardSkeleton />
    }

    const allDeals = totalDeals?.data?.deals ?? [];
    const totalPages = Math.ceil(allDeals?.length / ROWS_PER_PAGE);
    const indexOfFirst = (currentPage - 1) * ROWS_PER_PAGE;
    const indexOfLast = Math.min(currentPage * ROWS_PER_PAGE, allDeals?.length);
    const currentDeals = allDeals.slice(indexOfFirst, indexOfLast);
    const dealColumns = currentDeals.reduce(
        (columns, deal, index) => {
            columns[index % 2].push({ deal, index });
            return columns;
        },
        [[], []]
    );

    return (
        <div className="bg-gray-50 min-h-[10vh] px-4 py-12.5">
            <div className="max-w-305 mx-auto">
                <div className="flex items-start justify-between gap-2 mb-6">
                    <h2 className="text-base font-bold leading-tight text-[#262626] sm:text-2xl md:text-[28px]">Explore nearby</h2>
                    <DynamicLocation
                        latitude={latitude}
                        longitude={longitude}
                        className="flex max-w-[52%] items-start justify-end gap-1.5 text-right text-sm font-semibold leading-snug text-primary sm:max-w-none sm:items-center sm:gap-2 sm:text-base md:text-lg"
                        iconClassName="mt-0.5 h-4 w-4 shrink-0 sm:mt-0 sm:h-5 sm:w-5"
                    />
                </div>

                {totalDeals?.data?.deals?.length > 0 ? (
                    <>
                        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-5 lg:hidden">
                            {dealColumns.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    className={`flex flex-col gap-3 sm:gap-5 ${columnIndex === 1 ? "max-[500px]:pt-5" : ""}`}
                                >
                                    {column.map(({ deal, index }) => (
                                        <DealCard
                                            key={deal?._id || index}
                                            deal={deal}
                                            compact
                                            imageSize={index % 3 === 1 ? "tall" : "normal"}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {currentDeals?.map((deal) => (
                                <DealCard key={deal?._id} deal={deal} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 min-h-[10vh] flex items-center justify-center">
                        <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                    </div>
                )}
                {
                    totalDeals?.data?.deals?.length > 0 && <Pagination
                        totalPages={totalPages}
                        totalItems={allDeals?.length}
                        rowsPerPage={ROWS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        indexOfLast={indexOfLast}
                    />
                }
            </div>
        </div>
    );
};

export default Deals;
