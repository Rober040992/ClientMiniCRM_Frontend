// Shared header for all authenticated pages.
// Pass any content as `right` — logout button, back link, etc.
import React from "react";

type Props = {
  right?: React.ReactNode;
};

export default function DashboardHeader({ right }: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6 py-4">

      {/* Brand — logo mark + name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30">
          <svg
            aria-hidden
            className="w-4 h-4"
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
        <span className="text-lg font-semibold text-foreground tracking-tight">
          Mini<span className="text-accent">CRM</span>
        </span>
      </div>

      {/* Right slot — caller decides what goes here */}
      {right && <div className="flex items-center gap-4">{right}</div>}
    </header>
  );
}
