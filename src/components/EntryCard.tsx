import Link from "next/link";
import type { ReflectionEntry } from "@/types";
import { ChevronRight, Cog, Leaf, Trash2, TreePine } from "lucide-react";

type Props = {
  entry: ReflectionEntry;
  onDelete?: (id: string) => void;
};

export function EntryCard({ entry, onDelete }: Props) {
  return (
    <article className="card-elevated group rounded-2xl p-4 transition hover:border-pond-500/20">
      <div className="flex items-start gap-2">
        <Link href={`/entries/${entry.id}`} className="min-w-0 flex-1">
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
            <span>Mechanical {entry.mechanicalScore}/5</span>
            <span>Nature {entry.natureScore}/5</span>
            <span>Margin {entry.marginScore}/5</span>
          </div>
        </Link>

        <div className="flex shrink-0 flex-col items-center gap-1">
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onDelete(entry.id);
              }}
              className="rounded-lg p-1.5 text-ink/25 transition hover:bg-red-50 hover:text-red-500"
              aria-label="Delete reflection"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <Link href={`/entries/${entry.id}`} className="p-1.5 text-ink/20 group-hover:text-pond-500">
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
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
