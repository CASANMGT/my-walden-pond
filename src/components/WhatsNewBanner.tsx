"use client";

import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { getLatestRelease } from "@/data/releases";
import { getVersionLabel, hasUnseenUpdate, markVersionSeen } from "@/lib/version";
import { useEffect, useState } from "react";

export function WhatsNewBanner() {
  const [visible, setVisible] = useState(false);
  const release = getLatestRelease();

  useEffect(() => {
    setVisible(hasUnseenUpdate());
  }, []);

  if (!visible) return null;

  function dismiss() {
    markVersionSeen();
    setVisible(false);
  }

  return (
    <div className="mx-4 mt-3 animate-fade-up rounded-2xl border border-sunlight/40 bg-gradient-to-r from-sunlight/15 to-pond-50/80 p-4">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-sunlight" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-pond-900">
            Updated to {getVersionLabel()}
          </p>
          <p className="mt-0.5 text-xs text-ink/60">{release.title}</p>
          <Link
            href="/about"
            onClick={dismiss}
            className="mt-2 inline-block text-xs font-medium text-pond-700 underline"
          >
            See what&apos;s new
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg p-1 text-ink/40 hover:bg-white/50"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
