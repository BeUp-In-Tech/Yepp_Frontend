const CategoriesSkeleton = () => {
    const navItems = Array.from({ length: 12 }, (_, index) => index + 1);

    return (
        <div className="bg-[color-mix(in_srgb,var(--primary-color)_10%,white)] px-4 fixed w-full pt-20 z-40" role="status" aria-label="Loading categories">
            <span className="sr-only">Loading categories</span>
            <div className="max-w-305 mx-auto py-3 flex items-center gap-3" aria-hidden="true">
                <div className="flex max-h-8 min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-3 overflow-hidden sm:gap-x-6 lg:gap-x-10">
                    {navItems.map((item) => (
                        <div key={item} className="flex h-8 max-w-36 shrink-0 items-center gap-2 sm:max-w-44 lg:max-w-none">
                            <div className="skeleton-item h-6 w-6 shrink-0 rounded bg-slate-300"></div>
                            <span className="skeleton-text h-4 w-20 rounded bg-slate-300"></span>
                        </div>
                    ))}
                </div>
                <div className="h-9 w-20 shrink-0 rounded-full bg-slate-300"></div>
            </div>
        </div>
    );
};

export default CategoriesSkeleton;
