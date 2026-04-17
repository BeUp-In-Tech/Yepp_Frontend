import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../features/categories/CategoriesApi';
import CategoriesSkeleton from '../skeleton/CategoriesSkeleton';

const CategoryHeader = () => {
    const sliderRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const { data: categories, isLoading } = useGetAllCategoriesQuery();

    if (isLoading) {
        return <CategoriesSkeleton />
    }
    const mouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const mouseLeave = () => setIsDown(false);
    const mouseUp = () => setIsDown(false);

    const mouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const scrollByAmount = (amount) => {
        sliderRef.current.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };
    return (
        <div className='bg-[#F0F9FF] px-4 fixed w-full pt-20 z-40'>
            <div className="max-w-305 mx-auto py-3 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => scrollByAmount(-200)}
                    aria-label="Scroll categories left"
                    className="rounded-full bg-[#E0F2FE] text-[#A3A3A3] hover:bg-blue-100">
                    <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <div
                    aria-label="Deal categories"
                    ref={sliderRef}
                    onMouseDown={mouseDown}
                    onMouseLeave={mouseLeave}
                    onMouseUp={mouseUp}
                    onMouseMove={mouseMove}
                    className="flex items-center gap-12 overflow-x-auto no-scrollbar flex-1 cursor-grab select-none">
                    {categories?.data.map((cat) => (
                        <NavLink
                            to={`/categori-details/${cat?._id}`}
                            key={cat._id}
                            className={({ isActive }) => isActive ? 'flex items-center gap-2 whitespace-nowrap text-[#4DB6C1] hover:text-[#4DB6C1] transition-colors' : 'flex items-center gap-2 whitespace-nowrap text-gray-600 hover:text-[#4DB6C1] transition-colors'}>
                            <img className="text-gray-400 hover:text-[#4DB6C1] w-6 h-fit" src={cat.category_image} alt={`${cat.category_name} category`} />
                            <span className='text-sm font-medium'>{cat.category_name}</span>
                        </NavLink>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => scrollByAmount(200)}
                    aria-label="Scroll categories right"
                    className="rounded-full bg-[#E0F2FE] text-[#A3A3A3] hover:bg-blue-100">
                    <ChevronRight size={20} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default CategoryHeader;
