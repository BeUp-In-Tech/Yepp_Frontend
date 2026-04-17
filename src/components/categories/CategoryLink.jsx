import { NavLink } from "react-router-dom";

const CategoryLink = ({ category, variant = "header" }) => {
    const categoryName = category?.category_name || "Category";
    const categoryImage = category?.category_image;
    const to = `/categori-details/${category?._id}`;

    if (variant === "card") {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex flex-col items-center gap-2 text-center transition-colors ${isActive
                        ? "text-[#4DB6C1]"
                        : "text-[#262626] hover:text-[#4DB6C1]"
                    }`
                }
            >
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F0F9FF] transition-colors sm:h-24 sm:w-24">
                    <img className="h-10 w-10 object-contain sm:h-12 sm:w-12" src={categoryImage} alt={`${categoryName} category`} />
                </span>
                <span className="max-w-24 text-sm font-semibold leading-5 sm:text-base">
                    {categoryName}
                </span>
            </NavLink>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex h-8 min-w-0 max-w-36 shrink-0 items-center gap-2 whitespace-nowrap transition-colors sm:max-w-44 lg:max-w-none ${isActive
                    ? "text-[#4DB6C1]"
                    : "text-gray-600 hover:text-[#4DB6C1]"
                }`
            }
        >
            <img className="h-6 w-6 shrink-0 object-contain" src={categoryImage} alt={`${categoryName} category`} />
            <span className="min-w-0 truncate text-sm font-medium">{categoryName}</span>
        </NavLink>
    );
};

export default CategoryLink;
