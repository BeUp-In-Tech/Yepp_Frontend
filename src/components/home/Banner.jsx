import SearchBox from './SearchBox';

const Banner = ({ handleSearch }) => {
    
    return (
        <div className='bg-image px-4 bg-no-repeat bg-cover min-h-[52vh] sm:min-h-[56vh] md:min-h-[60vh]'>
            <div className='max-w-305 mx-auto flex min-h-[52vh] flex-col justify-center pt-44 pb-12 sm:min-h-[56vh] sm:pt-46 sm:pb-16 md:min-h-[60vh] md:pt-44 md:pb-20'>
                <h1 className='text-[#FFFFFF] text-[28px] sm:text-[45px] md:text-[56px] font-bold max-w-115.25 poppins leading-9 sm:leading-12 md:leading-17'>Find Local Deals & Save Big!</h1>
                <p className='text-[#FFFFFF] text-sm sm:text-base font-medium mt-1'>Discover the best discounts from your favorite local businesses start saving today.  </p>
                <SearchBox handleSearch={handleSearch} />
            </div>
        </div>
    );
};

export default Banner;
