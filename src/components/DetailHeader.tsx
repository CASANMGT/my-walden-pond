"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Menu } from "lucide-react";
import { useAppShell } from "./AppShell";

type Props = {
  backHref: string;
  backLabel: string;
  center?: string;
};

export function DetailHeader({ backHref, backLabel, center }: Props) {
  const { openMenu } = useAppShell();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-mist/70 bg-paper/92 px-4 py-3 backdrop-blur-lg">
      <Link
        href={backHref}
        className="flex min-w-0 max-w-[38%] items-center gap-1.5 text-sm text-ink/55"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        <span className="truncate">{backLabel}</span>
      </Link>
      {center ? (
        <span className="truncate text-center text-xs text-ink/45">{center}</span>
      ) : (
        <span className="flex-1" />
      )}
      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          onClick={openMenu}
          className="rounded-lg p-1.5 text-ink/50 transition hover:bg-mist/60"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <Link
          href="/settings#reminders"
          className="rounded-lg p-1.5 text-ink/50 transition hover:bg-mist/60"
          aria-label="Reminders"
        >
          <Bell className="h-5 w-5" strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  );
}
