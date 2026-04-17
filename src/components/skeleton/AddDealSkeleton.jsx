const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    ></div>
  );
};

const AddDealSkeleton = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <Skeleton className="h-8 w-64 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* Media Upload */}
            <div>
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="h-48 w-full rounded-xl" />

              <div className="flex gap-3 mt-4">
                {[1,2,3,4,5,6].map((i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </div>

            {/* Deal Info */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />

              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Pricing */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>

            {/* Category & Description */}
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>

            {/* File Upload */}
            <div className="flex gap-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            {/* Date Range */}
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>

      </div>
    </div>
  );
};

export default AddDealSkeleton;