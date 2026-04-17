import SearchBox from './SearchBox';

const Banner = ({ handleSearch }) => {
    return (
        <div className='bg-image px-4 bg-no-repeat bg-cover min-h-[60vh]'>
            <div className='max-w-305 mx-auto flex flex-col justify-center h-full pt-44 pb-20'>
                <h1 className='text-[#FFFFFF] text-[33px] sm:text-[45px] md:text-[56px] font-bold max-w-115.25 poppins leading-12 md:leading-17'>Find Local Deals & Save Big!</h1>
                <p className='text-[#FFFFFF] text-base font-medium mt-1'>Discover the best discounts from your favorite local businesses start saving today.  </p>
                <SearchBox handleSearch={handleSearch} />
            </div>
        </div>
    );
};

export default Banner;
