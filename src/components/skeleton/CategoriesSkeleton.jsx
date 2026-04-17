import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoriesSkeleton = () => {
    const navItems = [
        { id: 1, label: 'Health & Medical', isAvatar: false, isBarcode: false },
        { id: 2, label: 'Paula Lester', isAvatar: false, isBarcode: false },
        { id: 3, label: 'Jacob York', isAvatar: false, isBarcode: false },
        { id: 4, label: 'Branden Short', isAvatar: true, isBarcode: false },
        { id: 5, label: 'Evangeline Roberson', isAvatar: false, isBarcode: true },
        { id: 6, label: 'Health & Medical', isAvatar: false, isBarcode: false },
        { id: 7, label: 'Paula Lester', isAvatar: false, isBarcode: false },
        { id: 8, label: 'John Doe', isAvatar: false, isBarcode: false },
        { id: 9, label: 'Jane Smith', isAvatar: true, isBarcode: false },
        { id: 10, label: 'Emma White', isAvatar: false, isBarcode: true },
        { id: 11, label: 'Noah Johnson', isAvatar: true, isBarcode: false },
        { id: 12, label: 'Sophia Williams', isAvatar: false, isBarcode: true },
        { id: 13, label: 'Olivia Brown', isAvatar: false, isBarcode: false },
        { id: 14, label: 'Liam Green', isAvatar: true, isBarcode: false },
    ];

    return (
        <div className="bg-[#F0F9FF] px-4 fixed w-full pt-20 z-40" role="status" aria-label="Loading categories">
            <span className="sr-only">Loading categories</span>
            <div className="max-w-305 mx-auto py-3 flex items-center gap-2" aria-hidden="true">
                <button type="button" tabIndex={-1} className="rounded-full bg-[#E0F2FE] text-[#A3A3A3] hover:bg-blue-100">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-12 overflow-x-auto no-scrollbar flex-1 cursor-grab select-none">
                    {navItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 whitespace-nowrap cursor-pointer group ">
                            <div className="skeleton-item w-6 h-5 bg-slate-300 rounded-b-sm"></div>
                            <span className="text-slate-400 text-sm font-medium transition-colors skeleton-text px-2 bg-slate-300">{item?.label}</span>
                        </div>
                    ))}
                </div>
                <button type="button" tabIndex={-1} className="rounded-full bg-[#E0F2FE] text-[#A3A3A3] hover:bg-blue-100">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default CategoriesSkeleton;
