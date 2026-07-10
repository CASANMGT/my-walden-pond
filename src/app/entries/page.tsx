"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppShell";
import { EntryCard } from "@/components/EntryCard";
import { getEntries } from "@/lib/storage";
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
      e.optionalNote?.toLowerCase().includes(q)
    );
  });

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
        <p className="text-xs text-ink/45">{filtered.length} total</p>

        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-serif text-lg text-ink/40">No reflections yet.</p>
            <p className="mt-2 text-sm text-ink/40">
              Begin today&apos;s review to start your journal.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
