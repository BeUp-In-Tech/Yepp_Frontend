import { useParams } from "react-router-dom";
import useUserLocation from "../../../hooks/useUserLocation";
import { useGetAllCategoriesQuery, useGetCategoryDetailsQuery } from "../../../features/categories/CategoriesApi";
import { DealCardSkeleton } from "../../../components/skeleton/DealCardSkeleton";
import DealCard from "./DealCard";
import { MapPin } from "lucide-react";
import { useState } from "react";
import Pagination from "../../vendor/created-shop/components/Pagination";
const ROWS_PER_PAGE = import.meta.env.VITE_ROWS_PER_PAGE;

const CategorieDetails = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();
    const { latitude, longitude } = useUserLocation();
    const { data: categoriess, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
    const { data: categories, isLoading } = useGetCategoryDetailsQuery({ id, longitude, latitude });

    if (categoriesLoading || isLoading) {
        return <DealCardSkeleton />
    }

    const allDeals = categories?.data?.deals ?? [];
    const totalPages = Math.ceil(allDeals?.length / ROWS_PER_PAGE);
    const indexOfFirst = (currentPage - 1) * ROWS_PER_PAGE;
    const indexOfLast = Math.min(currentPage * ROWS_PER_PAGE, allDeals?.length);
    const currentDeals = allDeals.slice(indexOfFirst, indexOfLast);

    const categoryName = categoriess?.data?.find((cat) => cat._id === id);
    return (
        <div className="bg-gray-50 min-h-[65vh] px-4 py-36">
            <div className="max-w-305 mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#262626]">{categoryName?.category_name}</h2>
                    <div className="flex gap-2 items-center text-[#00616F] text-base font-semibold">
                        <MapPin size={18} /> <span>New york, United States</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        currentDeals.map((deal, index) => (
                            <DealCard key={index} deal={deal} />
                        ))
                    }
                    {
                        categories?.data?.deals?.length === 0 &&
                        <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                            <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                        </div>
                    }
                </div>
                {
                    categories?.data?.deals?.length > 0 && <Pagination
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

export default CategorieDetails;