export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="h-8 bg-violet-100 rounded w-1/4 mb-4"></div>
      <div className="space-y-2 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
        ))}
      </div>
      <div className="h-6 bg-violet-100 rounded w-1/5 mb-2"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-violet-100 rounded"></div>
        ))}
      </div>
      <div className="h-6 bg-violet-100 rounded w-1/5 mb-4"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-3/4"></div>
        ))}
      </div>
    </div>
  );
}
