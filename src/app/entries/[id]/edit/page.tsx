"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EntryEditForm } from "@/components/EntryEditForm";
import { getEntryById } from "@/lib/storage";

export default function EntryEditPage() {
  const params = useParams();
  const id = params.id as string;
  const [entry, setEntry] = useState(() => getEntryById(id));

  useEffect(() => {
    setEntry(getEntryById(id));
  }, [id]);

  if (!entry) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-ink/60">Entry not found.</p>
        <Link href="/entries" className="mt-4 inline-block text-pond-700 underline">
          Back to journal
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-mist/70 bg-paper/92 px-4 py-3 backdrop-blur-lg">
        <Link
          href={`/entries/${entry.id}`}
          className="flex items-center gap-2 text-sm text-ink/55"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </Link>
      </header>

      <div className="card-elevated mx-4 mt-4 rounded-3xl p-5">
        <h1 className="font-serif text-xl text-pond-900">Edit reflection</h1>
        <p className="mt-1 text-sm text-ink/50">{entry.date} · Ch. {entry.chapterNumber}</p>
        <div className="mt-6">
          <EntryEditForm entry={entry} />
        </div>
      </div>
    </>
  );
}
