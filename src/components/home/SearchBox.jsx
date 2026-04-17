import { useState } from 'react';
import { Search, MapPin, SendHorizontal } from 'lucide-react';

const SearchBox = ({ handleSearch }) => {
    const [formData, setFormData] = useState({
        query: '',
        zipCode: ''
    });

    const handleSearchButton = (e) => {
        e.preventDefault();
        const query = formData?.query;
        const zipCode = formData?.zipCode;
        handleSearch({ query, zipCode });
    };

    return (
        <div className="mt-4 sm:mt-7.5">
            <form
                role="search"
                aria-label="Search local deals"
                onSubmit={handleSearchButton}
                className="flex items-center w-full max-w-185 bg-white rounded-full px-2 py-1.5 sm:py-1 shadow-lg"
            >
                <div className="flex items-center grow px-4 gap-1 sm:gap-3">
                    <Search className="text-gray-400 w-5 h-5" aria-hidden="true" />
                    <label htmlFor="deal-search" className="sr-only">Search deals</label>
                    <input
                        id="deal-search"
                        type="text"
                        placeholder="Search deals...."
                        className="text-sm sm:text-base w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    />
                </div>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                <div className="flex items-center w-32 sm:w-48 px-4 gap-2">
                    <MapPin className="text-gray-400 w-5 h-5" aria-hidden="true" />
                    <label htmlFor="zip-code-search" className="sr-only">Zip code</label>
                    <input
                        id="zip-code-search"
                        type="text"
                        placeholder="Zip code"
                        className="text-sm sm:text-base w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="hidden sm:block bg-[#52bad1] hover:bg-[#46a5ba] text-white text-sm sm:text-base px-4 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-colors">
                    Search
                </button>
                <button
                    type="submit"
                    aria-label="Search deals"
                    className="sm:hidden text-white text-sm sm:text-base px-4 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-colors">
                    <SendHorizontal className="w-6 h-6 -rotate-45 text-[#4BBDCF]" aria-hidden="true" />
                </button>
            </form>
        </div>
    );
};

export default SearchBox;
