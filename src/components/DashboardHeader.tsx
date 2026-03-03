// Shared header for all authenticated pages.
// Pass any content as `right` — logout button, back link, etc.
import React from "react";
import { BriefcaseIcon } from "@/components/icons";

type Props = {
  right?: React.ReactNode;
};

export default function DashboardHeader({ right }: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6 py-4">

      {/* Brand — logo mark + name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30">
          <BriefcaseIcon />
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
