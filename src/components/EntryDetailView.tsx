"use client";

import type { ReflectionEntry } from "@/types";
import { Cog, Leaf, TreePine, Waves } from "lucide-react";

type Props = {
  entry: ReflectionEntry;
  compact?: boolean;
};

export function EntryDetailView({ entry, compact }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 text-xs text-ink/45">
          <span>{entry.date}</span>
          <span className="h-1 w-1 rounded-full bg-mist" />
          <span>Chapter {entry.chapterNumber}</span>
        </div>
        <h1 className="mt-2 font-serif text-2xl leading-tight text-pond-900">
          {entry.chapterTitle}
        </h1>
        <p className="mt-1 text-sm italic text-moss">{entry.themeName}</p>
        {!compact && entry.learningTakeaway && (
          <p className="mt-3 text-sm text-ink/65">
            Learning takeaway: <span className="text-ink/80">{entry.learningTakeaway}</span>
          </p>
        )}
      </div>

      <div className="space-y-3 rounded-2xl bg-mist/50 p-4">
        <InsightRow icon={<TreePine className="h-4 w-4" />} label="Walden Pond Answer" value={entry.waldenPondToday} />
        <InsightRow icon={<Cog className="h-4 w-4" />} label="Mechanical Area" value={entry.mechanicalArea} />
        <InsightRow icon={<Leaf className="h-4 w-4" />} label="Natural Anchor" value={entry.naturalAnchor} />
      </div>

      <div className="flex justify-between gap-3">
        <ScoreRing label="Mechanical" value={entry.mechanicalScore} icon={<Waves className="h-4 w-4" />} />
        <ScoreRing label="Nature" value={entry.natureScore} icon={<Leaf className="h-4 w-4" />} />
        <ScoreRing label="Margin" value={entry.marginScore} icon={<TreePine className="h-4 w-4" />} />
      </div>

      <div className="rounded-xl bg-pond-50/60 px-4 py-3 text-sm text-ink/70">
        Practice completed:{" "}
        <span className="font-medium text-pond-700">
          {entry.practiceCompleted ? "Yes" : "Not yet"}
        </span>
      </div>

      {entry.optionalNote && (
        <section>
          <p className="section-label mb-2">My Reflection</p>
          <p className="rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-ink/75 italic">
            {entry.optionalNote}
          </p>
        </section>
      )}
    </div>
  );
}

function InsightRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-moss">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide text-ink/40">{label}</p>
        <p className="mt-0.5 text-sm text-ink/80">{value}</p>
      </div>
    </div>
  );
}

function ScoreRing({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  const pct = (value / 5) * 100;
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl bg-white/60 py-4">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="none" stroke="#e6e8e2" strokeWidth="3" />
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="none"
            stroke="#1f3d34"
            strokeWidth="3"
            strokeDasharray={`${(pct / 100) * 113} 113`}
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm font-medium text-pond-700">{value}/5</span>
      </div>
      <span className="flex items-center gap-1 text-[10px] text-ink/45">
        {icon}
        {label}
      </span>
    </div>
  );
}
