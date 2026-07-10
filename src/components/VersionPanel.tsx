"use client";

import Link from "next/link";
import { Check, ChevronRight, GitBranch, Sparkles } from "lucide-react";
import { releases } from "@/data/releases";
import {
  APP_NAME,
  APP_VERSION,
  getLastSeenVersion,
  getVersionLabel,
  hasUnseenUpdate,
  markVersionSeen,
} from "@/lib/version";
import { useEffect, useState } from "react";

type Props = {
  compact?: boolean;
  showHistory?: boolean;
};

export function VersionPanel({ compact, showHistory = true }: Props) {
  const [unseen, setUnseen] = useState(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  useEffect(() => {
    setUnseen(hasUnseenUpdate());
    setLastSeen(getLastSeenVersion());
  }, []);

  function handleMarkSeen() {
    markVersionSeen();
    setUnseen(false);
    setLastSeen(APP_VERSION);
  }

  if (compact) {
    return (
      <Link
        href="/about"
        className="card-elevated flex items-center justify-between rounded-2xl p-4 transition hover:border-pond-500/20"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pond-50 text-pond-700">
            <GitBranch className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-pond-900">App version</p>
            <p className="text-xs text-ink/50">{getVersionLabel()} · Offline-first PWA</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unseen && (
            <span className="rounded-full bg-sunlight/30 px-2 py-0.5 text-[10px] font-medium text-pond-900">
              New
            </span>
          )}
          <ChevronRight className="h-5 w-5 text-ink/25" />
        </div>
      </Link>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card-elevated rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="section-label">Current version</p>
            <h2 className="mt-1 font-serif text-2xl text-pond-900">{getVersionLabel()}</h2>
            <p className="mt-1 text-sm text-ink/55">{APP_NAME}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pond-50 to-mist text-pond-700">
            <GitBranch className="h-6 w-6" strokeWidth={1.5} />
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-xs text-ink/50">
          <Row label="Release" value={releases[0]?.title ?? "—"} />
          <Row label="Last opened" value={lastSeen ? `v${lastSeen}` : "First visit"} />
          <Row label="Storage" value="Local device only" />
        </div>

        {unseen && (
          <button
            type="button"
            onClick={handleMarkSeen}
            className="btn-primary mt-4"
          >
            <Sparkles className="h-4 w-4" />
            Mark {getVersionLabel()} as seen
          </button>
        )}
      </div>

      {showHistory && (
        <div className="space-y-3">
          <h3 className="section-label px-1">Release history</h3>
          {releases.map((release, index) => (
            <article
              key={release.version}
              className={`card-elevated rounded-2xl p-4 ${
                index === 0 ? "border border-pond-500/15" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-serif text-base text-pond-900">
                    v{release.version}
                    {index === 0 && (
                      <span className="ml-2 rounded-full bg-pond-50 px-2 py-0.5 font-sans text-[10px] text-pond-700">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-ink/45">{release.date}</p>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-ink/75">{release.title}</p>
              <ul className="mt-3 space-y-1.5">
                {release.added.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/65">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pond-500" />
                    {item}
                  </li>
                ))}
              </ul>
              {release.changed && release.changed.length > 0 && (
                <div className="mt-3 border-t border-mist/70 pt-3">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-ink/40">
                    Changed
                  </p>
                  <ul className="mt-2 space-y-1">
                    {release.changed.map((item) => (
                      <li key={item} className="text-sm text-ink/55">
                        · {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <a
        href="https://github.com/CASANMGT/my-walden-pond/releases"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2 text-sm text-moss hover:text-pond-700"
      >
        View releases on GitHub
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-mist/50 py-1.5 last:border-0">
      <span>{label}</span>
      <span className="text-right text-ink/70">{value}</span>
    </div>
  );
}

export function VersionBadge({ showNew }: { showNew?: boolean }) {
  return (
    <Link
      href="/about"
      className="inline-flex items-center gap-1 rounded-full border border-mist bg-white/70 px-2.5 py-1 text-[10px] font-medium text-ink/55 transition hover:border-pond-500/30 hover:text-pond-700"
    >
      <GitBranch className="h-3 w-3" />
      {getVersionLabel()}
      {showNew && (
        <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-sunlight" aria-label="Update available" />
      )}
    </Link>
  );
}
