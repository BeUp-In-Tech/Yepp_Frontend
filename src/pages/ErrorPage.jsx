const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="mb-8 text-[#5BC0DE]">
                <svg className="w-64 h-64 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Out of Stock.</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                We can't find the page you're looking for. It might have been moved or the deal has ended.
            </p>

            <a href="/" className="bg-[#5BC0DE] hover:bg-[#46a3be] text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md">
                Back to Local Deals
            </a>

            <div className="mt-12 text-sm text-gray-400">
                Error Code: 404_DEAL_NOT_FOUND
            </div>
        </div>
    );
};

export default ErrorPage;