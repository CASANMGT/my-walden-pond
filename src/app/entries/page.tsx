"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { AppHeader } from "@/components/AppShell";
import { EntryCard } from "@/components/EntryCard";
import { deleteEntry, getEntries } from "@/lib/storage";
import type { ReflectionEntry } from "@/types";

export default function EntriesPage() {
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const filtered = entries.filter((e) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      e.chapterTitle.toLowerCase().includes(q) ||
      e.themeName.toLowerCase().includes(q) ||
      e.optionalNote?.toLowerCase().includes(q) ||
      e.waldenPondToday.toLowerCase().includes(q) ||
      e.mechanicalArea.toLowerCase().includes(q) ||
      e.naturalAnchor.toLowerCase().includes(q)
    );
  });

  function handleDelete(id: string) {
    if (!confirm("Delete this reflection? This cannot be undone.")) return;
    deleteEntry(id);
    setEntries(getEntries());
  }

  return (
    <>
      <AppHeader title="Journal" />
      <div className="space-y-4 px-4 pt-4 pb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entries..."
          className="w-full rounded-2xl border border-mist bg-white/80 px-4 py-3.5 text-sm shadow-sm outline-none focus:border-pond-500/50 focus:ring-2 focus:ring-pond-500/10"
        />
        <p className="text-xs text-ink/45">
          {query.trim()
            ? `${filtered.length} of ${entries.length} reflection${entries.length !== 1 ? "s" : ""}`
            : `${entries.length} reflection${entries.length !== 1 ? "s" : ""}`}
        </p>

        {entries.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-serif text-lg text-ink/40">No reflections yet.</p>
            <p className="mt-2 text-sm text-ink/40">
              Begin today&apos;s review to start your journal.
            </p>
            <Link href="/" className="btn-primary mt-6 inline-flex">
              <Leaf className="h-4 w-4" />
              Go to Today
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-serif text-lg text-ink/40">No matches found.</p>
            <p className="mt-2 text-sm text-ink/40">Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <EntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
