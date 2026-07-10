"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Download, Leaf, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DetailHeader } from "@/components/DetailHeader";
import { EntryDetailView } from "@/components/EntryDetailView";
import {
  downloadMarkdown,
  entryMarkdownFilename,
  exportEntryToMarkdown,
} from "@/lib/exportMarkdown";
import { deleteEntry, getEntryById } from "@/lib/storage";
import { formatDateKey, toDateKey } from "@/lib/date";

export default function EntryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [entry, setEntry] = useState(() => getEntryById(id));
  const [menuOpen, setMenuOpen] = useState(false);

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

  const isToday = entry.date === toDateKey();

  function handleExport() {
    const md = exportEntryToMarkdown(entry!);
    downloadMarkdown(md, entryMarkdownFilename(entry!));
    setMenuOpen(false);
  }

  function handleDelete() {
    if (!confirm("Delete this reflection? This cannot be undone.")) return;
    deleteEntry(entry!.id);
    router.push("/entries");
  }

  return (
    <>
      <DetailHeader
        backHref="/entries"
        backLabel="Journal"
        center={formatDateKey(entry.date)}
      />

      <div className="relative">
        <div className="absolute right-4 top-0 z-10">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg p-1.5 text-ink/50 hover:bg-mist/60"
            aria-label="Options"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {menuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              />
              <div className="absolute right-0 z-50 mt-1 w-44 overflow-hidden rounded-xl border border-mist bg-paper shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(`/entries/${entry.id}/edit`);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-ink/70 hover:bg-mist/50"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-ink/70 hover:bg-mist/50"
                >
                  <Download className="h-4 w-4" />
                  Export .md
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <article className="card-elevated mx-4 mt-4 rounded-3xl p-5">
        <EntryDetailView entry={entry} />
      </article>

      <div className="space-y-3 px-4 py-6">
        <Link href={`/entries/${entry.id}/edit`} className="btn-primary">
          <Pencil className="h-4 w-4" />
          Edit reflection
        </Link>
        {isToday ? (
          <Link
            href={`/review?chapter=${entry.chapterNumber}&replace=1`}
            className="btn-secondary"
          >
            <Leaf className="h-4 w-4" />
            Replace today&apos;s reflection
          </Link>
        ) : (
          <Link
            href={`/review?chapter=${entry.chapterNumber}`}
            className="btn-secondary"
          >
            <Leaf className="h-4 w-4" />
            Reflect on this chapter again
          </Link>
        )}
        <button type="button" onClick={handleExport} className="btn-secondary">
          <Download className="h-4 w-4" />
          Export as Markdown
        </button>
      </div>
    </>
  );
}
