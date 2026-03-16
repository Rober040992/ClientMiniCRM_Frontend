import Link from "next/link";
import { BriefcaseIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
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
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Logo mark */}
        <div className="mb-2 text-center" style={{ perspective: "1000px" }}>
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/15"
            style={{
              animation: "landing-icon-rotation 8s linear infinite",
              filter: "drop-shadow(0 0 15px rgba(160, 100, 255, 0.5))",
              transformStyle: "preserve-3d",
            }}
          >
            <BriefcaseIcon className="h-10 w-10" />
          </div>
        </div>

        {/* Brand name */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Mini<span className="text-accent">CRM</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          A minimal client tracker. Login to access your private area.
        </p>

        {/* CTA */}
        <Link
          href="/login"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent/40"
        >
          Get started
        </Link>
      </div>
    </main>
  );
}
