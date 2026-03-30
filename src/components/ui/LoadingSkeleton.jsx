

const SkeletonBlock = ({ className }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200/80 shimmer ${className}`}
    />
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white/40 backdrop-blur-lg shadow-lg rounded-2xl p-6 space-y-3">
        <SkeletonBlock className="h-5 w-40 rounded-md" />
        <SkeletonBlock className="h-10 w-24 rounded-md" />
        <SkeletonBlock className="h-4 w-32 rounded-md" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white/40 backdrop-blur-lg shadow-md rounded-2xl p-4 space-y-3"
          >
            <SkeletonBlock className="h-4 w-20 rounded" />
            <SkeletonBlock className="h-8 w-16 rounded" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white/40 backdrop-blur-lg shadow-md rounded-2xl p-4 space-y-4"
          >
            <SkeletonBlock className="h-5 w-32 rounded" />
            <SkeletonBlock className="h-56 w-full rounded-lg" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default LoadingSkeleton;