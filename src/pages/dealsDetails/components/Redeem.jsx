import { images } from '../../../assets/image';

const Redeem = () => {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4 lg:ml-4">
            <div className="max-w-28 sm:max-w-32 mx-auto text-center space-y-2">
                <h1 className='text-sm font-bold text-[#0369A1] sm:text-base'>1. Redeem the Deal</h1>
                <div className="flex items-center justify-center">
                    <img className='w-24 object-cover sm:w-35' src={images.dealImage} alt="dealImage" />
                </div>
            </div>
            <div className="max-w-32 sm:max-w-37.25 mx-auto text-center space-y-2 mt-4 sm:mt-6">
                <h1 className='text-sm font-bold text-[#0369A1] sm:text-base'>2. Book Your Appointment</h1>
                <div className="flex items-center justify-center">
                    <img className='w-24 object-cover sm:w-35' src={images.book_appointment} alt="dealImage" />
                </div>
            </div>
            <div className="max-w-36 sm:max-w-50 mx-auto text-center space-y-2">
                <h1 className='text-sm font-bold text-[#0369A1] sm:text-base'>3. Show Your Coupon</h1>
                <div className="flex items-center justify-center">
                    <img className='w-24 object-cover sm:w-35' src={images.cuponImage} alt="dealImage" />
                </div>
            </div>
            <div className="max-w-28 sm:max-w-32.5 mx-auto text-center space-y-2 mt-4 sm:mt-6">
                <h1 className='text-sm font-bold text-[#0369A1] sm:text-base'>4. Enjoy Your Treatment</h1>
                <div className="flex items-center justify-center">
                    <img className='w-24 object-cover sm:w-35' src={images.treatmentImage} alt="dealImage" />
                </div>
            </div>
        </div>
    );
};

export default Redeem;
