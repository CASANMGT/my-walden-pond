import Link from "next/link";
import type { ReflectionEntry } from "@/types";
import { ChevronRight, Cog, Leaf, TreePine } from "lucide-react";

type Props = {
  entry: ReflectionEntry;
};

export function EntryCard({ entry }: Props) {
  return (
    <Link href={`/entries/${entry.id}`} className="block">
      <article className="card-elevated group rounded-2xl p-4 transition hover:border-pond-500/20">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-ink/45">
              <span>{entry.date}</span>
              <span className="h-1 w-1 rounded-full bg-mist" />
              <span>Ch. {entry.chapterNumber}</span>
            </div>
            <h3 className="mt-1 font-serif text-lg text-pond-900">{entry.chapterTitle}</h3>
            <p className="text-sm italic text-moss">{entry.themeName}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Tag icon={<TreePine className="h-3 w-3" />} text={entry.waldenPondToday} />
              <Tag icon={<Cog className="h-3 w-3" />} text={entry.mechanicalArea} />
              <Tag icon={<Leaf className="h-3 w-3" />} text={entry.naturalAnchor} />
            </div>

            <div className="mt-3 flex gap-3 text-[10px] text-ink/40">
              <span>Reflection {entry.mechanicalScore}/5</span>
              <span>Peace {entry.natureScore}/5</span>
              <span>Clarity {entry.marginScore}/5</span>
            </div>
          </div>
          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-ink/20 group-hover:text-pond-500" />
        </div>
      </article>
    </Link>
  );
}

function Tag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-mist/70 px-2 py-0.5 text-[10px] text-ink/55">
      {icon}
      <span className="truncate">{text}</span>
    </span>
  );
}
