export default function DashboardLoading() {
  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8">
          <div className="h-3 w-20 rounded bg-muted-foreground/20" />
          <div className="mt-3 h-8 w-52 rounded bg-muted-foreground/20" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border bg-card p-5">
              <div className="h-3 w-32 rounded bg-muted-foreground/20" />
              <div className="mt-3 h-8 w-16 rounded bg-muted-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
