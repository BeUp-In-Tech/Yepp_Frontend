import { NavLink } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../features/categories/CategoriesApi';
import CategoryLink from '../categories/CategoryLink';
import CategoriesSkeleton from '../skeleton/CategoriesSkeleton';

const CategoryHeader = () => {
    const { data: categories, isLoading } = useGetAllCategoriesQuery();

    if (isLoading) {
        return <CategoriesSkeleton />
    }

    const categoryList = categories?.data ?? [];
    const visibleCategories = categoryList.slice(0, 20);
    const showTwoRows = visibleCategories.length > 10;
    const gridColumnCount = showTwoRows ? 10 : Math.max(visibleCategories.length, 1);

    return (
        <div className='fixed w-full bg-[#F0F9FF] px-3 pt-22 pb-2 shadow-sm sm:px-4 z-40'>
            <div className="max-w-305 mx-auto flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3">
                <nav
                    aria-label="Deal categories"
                    style={{ gridTemplateColumns: `repeat(${gridColumnCount}, minmax(72px, 1fr))` }}
                    className={`no-scrollbar grid min-w-0 flex-1 justify-items-center gap-x-2 overflow-x-auto overflow-y-hidden pb-1 pr-1 sm:gap-x-3 lg:gap-x-4 ${showTwoRows
                        ? "max-h-28 grid-rows-2 gap-y-2 sm:max-h-33 sm:gap-y-3"
                        : "max-h-15 grid-rows-1 sm:max-h-17"
                    }`}>
                    {visibleCategories.map((cat) => (
                        <CategoryLink key={cat._id} category={cat} />
                    ))}
                </nav>

                <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                        `shrink-0 rounded-full px-2 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${isActive
                            ? "bg-primary text-white"
                            : "bg-[#f0f9ff] text-primary hover:bg-[#E0F2FE]"
                        }`
                    }>
                    See all
                </NavLink>
            </div>
        </div>
    );
};

export default CategoryHeader;
