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
        <div className='bg-[#F0F9FF] px-4 fixed w-full pt-20 z-40'>
            <div className="max-w-305 mx-auto py-3 flex items-center gap-3">
                <nav
                    aria-label="Deal categories"
                    className="flex max-h-8 min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-3 overflow-hidden sm:gap-x-6 lg:gap-x-10">
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
