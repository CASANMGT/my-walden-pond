import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ChapterModule } from "@/types";
import { getThemeAccent, ThemeIcon } from "./ThemeIcon";

type Props = {
  chapter: ChapterModule;
  completed?: boolean;
};

export function ChapterListItem({ chapter, completed }: Props) {
  return (
    <Link
      href={`/chapters/${chapter.chapterNumber}`}
      className={`card-elevated group flex items-center gap-3 rounded-2xl border-l-[3px] p-4 transition hover:border-pond-500/40 ${getThemeAccent(chapter.themeId)}`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full font-serif ${
          completed
            ? "bg-pond-700 text-white"
            : "bg-gradient-to-br from-pond-50 to-mist text-pond-700"
        }`}
      >
        <span className="text-[10px] leading-none opacity-60">Ch</span>
        <span className="text-sm font-semibold leading-none">{chapter.chapterNumber}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-base leading-snug text-pond-900">
          {chapter.chapterTitle}
        </h3>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-moss">
          <ThemeIcon themeId={chapter.themeId} className="h-3 w-3" />
          {chapter.themeName}
        </p>
        <p className="mt-1.5 line-clamp-1 text-sm italic text-ink/45">
          {chapter.coreLesson}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-ink/25 transition group-hover:text-pond-500" />
    </Link>
  );
}
