"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ReviewFlow } from "@/components/ReviewFlow";
import { getChapterByNumber } from "@/data/chapters";
import { getProgress } from "@/lib/storage";
import Link from "next/link";

function ReviewContent() {
  const params = useSearchParams();
  const chapterParam = params.get("chapter");
  const progress = typeof window !== "undefined" ? getProgress() : null;
  const num = chapterParam
    ? Number(chapterParam)
    : progress?.currentChapterNumber ?? 1;
  const chapter = getChapterByNumber(num);

  if (!chapter) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="text-ink/60">Chapter not found.</p>
        <Link href="/" className="mt-4 text-pond-700 underline">
          Return home
        </Link>
      </div>
    );
  }

  return <ReviewFlow chapter={chapter} />;
}

export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-sm text-ink/40">
          Preparing review...
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  );
}
