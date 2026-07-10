import Link from "next/link";
import type { WeeklySummary } from "@/types";
import { Cog, Leaf, Sun } from "lucide-react";
import { formatDateKey } from "@/lib/date";
import { PondIllustration } from "./PondIllustration";

type Props = {
  summary: WeeklySummary;
};

export function WeeklyMap({ summary }: Props) {
  return (
    <div className="animate-fade-up space-y-5 px-4 pt-4 pb-4">
      <div className="card-elevated overflow-hidden rounded-3xl">
        <div className="flex justify-center px-6 pt-5">
          <PondIllustration variant="circle" className="h-44 w-44" />
        </div>
        <div className="px-5 pb-5 text-center">
          <p className="font-serif text-xl text-pond-900">Weekly Walden Map</p>
          <p className="mt-1 text-sm text-ink/55">
            {summary.reviewCount} of 7 days practiced
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <InsightCard
          icon={<Leaf className="h-4 w-4" />}
          label="Most common theme"
          value={summary.mostCommonTheme ?? "—"}
        />
        <InsightCard
          icon={<Cog className="h-4 w-4" />}
          label="Most mechanical area"
          value={summary.mostCommonMechanical ?? "—"}
        />
        <InsightCard
          icon={<Sun className="h-4 w-4" />}
          label="Most healing natural anchor"
          value={summary.mostCommonAnchor ?? "—"}
        />
      </div>

      <section className="card-elevated rounded-2xl p-5">
        <h2 className="font-serif text-lg text-pond-900">Your Week in Balance</h2>
        <p className="mt-0.5 text-xs text-ink/45">Scores out of 5</p>
        <div className="mt-5 space-y-5">
          <ScoreBar label="Mechanical feeling" value={summary.avgMechanical} low="Low" high="High" />
          <ScoreBar label="Nature connection" value={summary.avgNature} low="Low" high="High" />
          <ScoreBar label="Inner margin" value={summary.avgMargin} low="Low" high="High" />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-pond-700/10 bg-gradient-to-br from-pond-50/90 to-mist/50">
        <PondIllustration variant="mini" className="rounded-none" />
        <div className="p-5">
          <h2 className="font-serif text-base text-pond-900">A Gentle Next Step</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            {summary.suggestedPractice}
          </p>
          <p className="mt-3 text-xs italic text-moss">
            You created space to breathe this week.
          </p>
        </div>
      </section>

      {summary.days.length > 0 && (
        <section className="card-elevated rounded-2xl p-5">
          <h2 className="font-serif text-base text-pond-900">Recent Days</h2>
          <ul className="mt-3 space-y-1">
            {summary.days.map((d) => (
              <li key={d.date}>
                <Link
                  href={`/entries/${d.entryId}`}
                  className="flex items-center justify-between rounded-xl px-2 py-2.5 text-sm transition hover:bg-mist/40"
                >
                  <span className="text-ink/45">{formatDateKey(d.date)}</span>
                  <span className="flex items-center gap-1.5 font-medium text-ink/75">
                    <Leaf className="h-3 w-3 text-moss" />
                    {d.themeName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {summary.reviewCount === 0 && (
        <p className="py-8 text-center text-sm text-ink/45">
          Complete a few daily reviews to see your weekly map.
        </p>
      )}
    </div>
  );
}

function InsightCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card-elevated flex items-center gap-3 rounded-2xl p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pond-50 to-mist text-moss">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide text-ink/40">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-ink/85">{value}</p>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  low,
  high,
}: {
  label: string;
  value: number;
  low: string;
  high: string;
}) {
  const pct = value ? (value / 5) * 100 : 0;
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-ink/70">{label}</span>
        <span className="font-medium tabular-nums text-pond-700">{value || "—"}/5</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pond-500 to-pond-700 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-ink/35">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}
