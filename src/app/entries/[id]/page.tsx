"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Leaf, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { EntryDetailView } from "@/components/EntryDetailView";
import {
  downloadMarkdown,
  entryMarkdownFilename,
  exportEntryToMarkdown,
} from "@/lib/exportMarkdown";
import { deleteEntry, getEntryById } from "@/lib/storage";

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
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-mist/70 bg-paper/92 px-4 py-3 backdrop-blur-lg">
        <Link href="/entries" className="flex items-center gap-2 text-sm text-ink/55">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <span className="text-xs text-ink/45">{entry.date}</span>
        <div className="relative">
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
      </header>

      <article className="card-elevated mx-4 mt-4 rounded-3xl p-5">
        <EntryDetailView entry={entry} />
      </article>

      <div className="space-y-3 px-4 py-6">
        <Link href={`/entries/${entry.id}/edit`} className="btn-secondary">
          <Pencil className="h-4 w-4" />
          Edit reflection
        </Link>
        <Link
          href={`/review?chapter=${entry.chapterNumber}`}
          className="btn-primary"
        >
          <Leaf className="h-4 w-4" />
          Review Again
        </Link>
        <button type="button" onClick={handleExport} className="btn-secondary">
          <Download className="h-4 w-4" />
          Export as Markdown
        </button>
      </div>
    </>
  );
}
