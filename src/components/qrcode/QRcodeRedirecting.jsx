const QRcodeRedirecting = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#4BBDCF] rounded-full animate-spin mb-6"></div>
            <h1 className="text-xl font-semibold text-gray-800">
                Redirecting...
            </h1>
            <p className="text-gray-500 mt-2">
                Please wait while we take you to your destination
            </p>
        </div>
    );
};

export default QRcodeRedirecting;