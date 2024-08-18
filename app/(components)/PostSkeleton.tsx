export default function PostSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="h-8 bg-violet-100 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
      <div className="space-y-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
        ))}
      </div>
      <div className="flex space-x-4 mb-6">
        <div className="h-8 bg-violet-100 rounded w-20"></div>
        <div className="h-8 bg-violet-100 rounded w-20"></div>
      </div>
      <div className="h-40 bg-gray-100 rounded"></div>
    </div>
  );
}
