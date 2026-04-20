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
        <div className='fixed w-full bg-[#F0F9FF] px-3 pt-22 pb-2 shadow-sm sm:px-4 z-40'>
            <div className="max-w-305 mx-auto flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3">
                <nav
                    aria-label="Deal categories"
                    className="flex max-h-15.5 min-w-0 flex-1 justify-start gap-x-2 gap-y-3 overflow-hidden sm:max-h-17 sm:gap-x-3 lg:gap-x-4 *:shrink-0">
                    {categoryList.map((cat) => (
                        <CategoryLink key={cat._id} category={cat} />
                    ))}
                </nav>

                <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                        `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive
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
