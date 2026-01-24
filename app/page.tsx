export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="glass glow rounded-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-primary text-glow mb-4">
            Claude Task Manager
          </h1>
          <p className="text-foreground-muted max-w-md">
            AI-powered task management coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}
