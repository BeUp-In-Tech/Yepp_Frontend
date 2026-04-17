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

    return (
        <div className='fixed w-full bg-[#F0F9FF] px-3 pt-20 shadow-sm sm:px-4 z-40'>
            <div className="max-w-305 mx-auto flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3">
                <nav
                    aria-label="Deal categories"
                    className="grid max-h-15.5 min-w-0 flex-1 items-start gap-x-2 gap-y-3 overflow-hidden sm:max-h-[68px] sm:gap-x-3 lg:gap-x-4"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(clamp(56px, 16vw, 86px), 1fr))" }}>
                    {categoryList.map((cat) => (
                        <CategoryLink key={cat._id} category={cat} />
                    ))}
                </nav>

                <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                        `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive
                            ? "bg-[#4BBDCF] text-white"
                            : "bg-[#f0f9ff] text-[#00616F] hover:bg-[#E0F2FE]"
                        }`
                    }>
                    See all
                </NavLink>
            </div>
        </div>
    );
};

export default CategoryHeader;
