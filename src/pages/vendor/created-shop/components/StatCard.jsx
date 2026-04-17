
const StatCard = ({ icon, label, value }) => {
    return (
        <div className="bg-[#F6F7FD] p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
            <div className="-mt-2">
                <img className="w-12.5" src={icon} alt="statIcon" />
            </div>
            <div className="text-center space-y-4">
                <p className="text-[#262626] text-2xl font-bold">{label || 0}</p>
                <p className="text-2xl font-bold text-gray-800">{value || 0}</p>
            </div>
        </div>
    );
};

export default StatCard;
