export default function PostsSkeleton() {
  return (
    <div className="grid gap-6 mt-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="border border-violet-200 p-4 rounded shadow-[-3px_3px_0px_#7c3aed] animate-pulse"
        >
          <div className="h-6 bg-violet-100 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}
