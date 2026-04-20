import { MoreHorizontal, Store } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShopApprovedEditMutation } from "../../../../../features/shop/shopApi";
import toast from "react-hot-toast";

const Table = ({ vednorData }) => {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [statusOverrides, setStatusOverrides] = useState({});
    const dropdownRef = useRef(null);
    const [shopApprovedEdit, { isLoading }] = useShopApprovedEditMutation();
    const vendors = useMemo(
        () =>
            (vednorData ?? []).map((vendor) => ({
                ...vendor,
                shop_approval: statusOverrides[vendor?._id] || vendor?.shop_approval,
            })),
        [statusOverrides, vednorData]
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleStatusChange = async (id, status) => {
        setOpenDropdownId(null);
        const previousStatus = vendors.find((vendor) => vendor?._id === id)?.shop_approval;

        setStatusOverrides((currentStatuses) => ({
            ...currentStatuses,
            [id]: status,
        }));

        try {
            await shopApprovedEdit({
                id: id,
                data: { shop_approval: status },
            }).unwrap();
            toast.success("Status update successfully!");
        } catch (error) {
            setStatusOverrides((currentStatuses) => ({
                ...currentStatuses,
                [id]: previousStatus,
            }));
            const message = error?.data?.message || "Status update failed!";
            toast.error(message);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-y border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-4 text-base font-semibold text-primary">Shop</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">User</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Deals</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Status</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Revenue</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary text-right">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {vendors?.length > 0 ? (
                        vendors.map((item) => (
                            <tr key={item?._id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-md bg-cyan-50 flex items-center justify-center border border-cyan-100 text-primary">
                                            <Store size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#525252] text-base">
                                                {item?.business_name}
                                            </div>
                                            <div className="text-sm font-medium text-[#737373]">
                                                {item?.business_email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {item?.vendor?.user_name}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {item?.totalDeals}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${item?.shop_approval === "APPROVED"
                                            ? "bg-[#DCFCE7] text-[#22C55E]"
                                            : item?.shop_approval === "PENDING"
                                                ? "bg-[#FEF9C3] text-[#CA8A04]"
                                                : item?.shop_approval === "REJECTED"
                                                    ? "bg-[#FEE2E2] text-[#DC2626]"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {item?.shop_approval}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm font-semibold text-[#525252]">
                                    ${item?.totalRevenue || 0}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="relative inline-block" ref={openDropdownId === item?._id ? dropdownRef : null}>
                                        <button
                                            onClick={() =>
                                                setOpenDropdownId(openDropdownId === item?._id ? null : item?._id)
                                            }
                                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                                        >
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>

                                        {openDropdownId === item?._id && (
                                            <div className="absolute right-0 -top-22 mt-2 w-40 pb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                                                <button
                                                    onClick={() => handleStatusChange(item?._id, "APPROVED")}
                                                    disabled={isLoading}
                                                    className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 font-medium"
                                                >
                                                    Approved
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(item?._id, "REJECTED")}
                                                    disabled={isLoading}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                No vendors found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
