// Public landing page
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center">
      <header className="container space-y-2 flex flex-col justify-center">
        <h1 className="text-primary text-3xl font-semibold tracking-tight">
          MiniCRM
        </h1>
        <p className="text-sm text-muted">
          A minimal client tracker. Login to access your private area.
        </p>
        
        <div>
          <Link
            href="/login"
            className="inline-flex items-center rounded-md border border-white/15 px-4 py-2 text-sm hover:text-accent"
          >
            Login with Google
          </Link>
        </div>
      </header>
    </main>
  );
}
