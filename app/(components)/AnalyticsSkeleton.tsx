export default function AnalyticsSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="h-8 bg-violet-100 rounded w-1/4 mb-4"></div>
      <div className="mb-8">
        <div className="h-6 bg-violet-100 rounded w-1/5 mb-2"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-violet-100 rounded"></div>
          ))}
        </div>
      </div>
      <div>
        <div className="h-6 bg-violet-100 rounded w-1/5 mb-2"></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-violet-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
