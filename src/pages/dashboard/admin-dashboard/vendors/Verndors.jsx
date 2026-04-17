import { useState, useEffect } from "react";
import { useGetVendorsStatQuery } from "../../../../features/dashboard/dashboardHome";
import HeadingTitle from "../components/HeadingTitle";
import StatsCard from "./components/StatsCard";
import Header from "./components/Header";
import Table from "./components/Table";
import VendorManagementSkeleton from "../../../../components/skeleton/dashboard/VendorManagementSkeleton";
import Pagination from "./components/Pagination";
import { AlertCircle, CheckCircle2, Store } from "lucide-react";

const Verndors = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [revenueFilter, setRevenueFilter] = useState("New to Old");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit,] = useState(10);

    const { data: vendorDetails, isLoading } = useGetVendorsStatQuery({
        sort: revenueFilter,
        searchTerm: debouncedSearchTerm,
        page: page,
        limit: limit,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(vendorDetails?.data?.summery?.totalVendors / limit)) {
            setPage(newPage);
        }
    };

    if (isLoading) {
        return <VendorManagementSkeleton />;
    }

    const { totalActiveVendors, totalPendingVendors, totalVendors } = vendorDetails?.data?.summery || {};
    const totalPages = Math.ceil(totalVendors / limit);

    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title="Shop Management"
                description="Manage Shop accounts and applications"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <StatsCard
                    bgColor="bg-[#FFFFFF]"
                    color="text-[#262626]"
                    subtitleColor="text-[#34C759]"
                    titleText="Total Vendors"
                    value={totalVendors}
                    iconBg="bg-[#F0F9FF]"
                    iconColor="text-[#A8EBF7]"
                    Icon={Store}
                />
                <StatsCard
                    bgColor="bg-[#FFFFFF]"
                    color="text-[#262626]"
                    subtitleColor="text-[#34C759]"
                    titleText="Active Vendors"
                    value={totalActiveVendors}
                    iconBg="bg-[#F0FDF4]"
                    iconColor="text-[#22C55E]"
                    Icon={CheckCircle2}
                />
                <StatsCard
                    bgColor="bg-[#FFFFFF]"
                    color="text-[#262626]"
                    subtitleColor="text-[#34C759]"
                    titleText="Pending Approval"
                    value={totalPendingVendors}
                    iconBg="bg-[#FFFAE8]"
                    iconColor="text-[#F0C106]"
                    Icon={AlertCircle}
                />
            </div>

            <div className="text-slate-700 pt-10">
                <div className="bg-white rounded-lg overflow-hidden">
                    <Header
                        setSearchTerm={setSearchTerm}
                        setIsFilterOpen={setIsFilterOpen}
                        isFilterOpen={isFilterOpen}
                        revenueFilter={revenueFilter}
                        setRevenueFilter={setRevenueFilter}
                    />
                    <Table vednorData={vendorDetails?.data?.vendors} />

                    {/* Pagination */}
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Verndors;
