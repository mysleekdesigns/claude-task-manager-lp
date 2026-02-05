import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen" role="status" aria-label="Loading page content">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-8">
            <div className="flex flex-1 flex-col items-center space-y-6 lg:items-start">
              <Skeleton variant="rectangular" className="h-7 w-32 rounded-full" />
              <Skeleton variant="text" className="h-12 w-full max-w-lg" />
              <Skeleton variant="text" className="h-12 w-3/4 max-w-md" />
              <Skeleton variant="text" lines={2} className="max-w-xl" />
              <div className="flex gap-4 pt-4">
                <Skeleton variant="rectangular" className="h-12 w-40 rounded-lg" />
                <Skeleton variant="rectangular" className="h-12 w-36 rounded-lg" />
              </div>
            </div>
            <div className="flex-1">
              <Skeleton variant="rectangular" className="h-[400px] w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center space-y-4">
            <Skeleton variant="text" className="h-8 w-64" />
            <Skeleton variant="text" className="h-5 w-96" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass space-y-4 rounded-xl p-6">
                <Skeleton variant="circular" className="h-12 w-12" />
                <Skeleton variant="text" className="h-5 w-2/3" />
                <Skeleton variant="text" lines={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
