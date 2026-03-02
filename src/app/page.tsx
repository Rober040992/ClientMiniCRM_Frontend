// Public landing page — dark hero with violet accent
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">

      {/* Radial glow — decorative violet bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.58 0.22 288 / 18%) 0%, transparent 70%)",
        }}
      />

      {/* Brand card */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">

        {/* Logo mark */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 mb-2">
          <svg
            aria-hidden
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="oklch(0.58 0.22 288)"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-4 0v2" />
            <line x1="12" y1="12" x2="12" y2="16" />
          </svg>
        </div>

        {/* Brand name */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Mini<span className="text-accent">CRM</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
          A minimal client tracker. Login to access your private area.
        </p>

        {/* CTA */}
        <Link
          href="/login"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:brightness-110 hover:shadow-accent/40 hover:-translate-y-0.5"
        >
          Get started
        </Link>
      </div>
    </main>
  );
}

