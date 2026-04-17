import { images } from "../../../../assets/image";
import DashboardStatsSkeleton from "../../../../components/skeleton/DashboardStatsSkeleton";
import { useGetShopAnalyticsStatQuery } from "../../../../features/shop/shopApi";
import StatCard from "./StatCard";

const Stats = () => {
    const { data: analytics, isLoading } = useGetShopAnalyticsStatQuery();
    if (isLoading) {
        return <DashboardStatsSkeleton />
    }
    const { activeDeals, totalViews, totalImpressions } = analytics?.data || {};
    const ctr = totalImpressions > 0
        ? ((totalViews / totalImpressions) * 100).toFixed(2)
        : 0;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard icon={images.activeIcon} label="Active Deals" value={activeDeals} />
            <StatCard icon={images.totalView} label="Total Views" value={totalViews} />
            <div className="bg-[#F6F7FD] py-6 px-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <div>
                    <img className='w-12.5' src={images.impression} alt="statIcon" />
                </div>
                <div className='text-center space-y-4'>
                    <p className="text-[#00444E] text-2xl font-bold">Total Impression: {totalImpressions || 0}</p>
                    <p className="text-[#262626] text-2xl font-bold">{ctr || 0}%  <span className="text-yellow-500 text-2xl font-bold ml-2">CTR</span></p>
                </div>
            </div>
        </div>
    );
};

export default Stats;