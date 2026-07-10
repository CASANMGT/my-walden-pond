"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReflectionEntry } from "@/types";
import { ReflectionSliders } from "./ReflectionSliders";
import { updateEntry } from "@/lib/storage";

type Props = {
  entry: ReflectionEntry;
};

export function EntryEditForm({ entry }: Props) {
  const router = useRouter();
  const [mechScore, setMechScore] = useState(entry.mechanicalScore);
  const [natureScore, setNatureScore] = useState(entry.natureScore);
  const [marginScore, setMarginScore] = useState(entry.marginScore);
  const [practiceDone, setPracticeDone] = useState(entry.practiceCompleted);
  const [walden, setWalden] = useState(entry.waldenPondToday);
  const [mechanical, setMechanical] = useState(entry.mechanicalArea);
  const [anchor, setAnchor] = useState(entry.naturalAnchor);
  const [note, setNote] = useState(entry.optionalNote ?? "");

  function handleSave() {
    updateEntry(entry.id, {
      waldenPondToday: walden.trim(),
      mechanicalArea: mechanical.trim(),
      naturalAnchor: anchor.trim(),
      mechanicalScore: mechScore,
      natureScore: natureScore,
      marginScore: marginScore,
      practiceCompleted: practiceDone,
      optionalNote: note.trim() || undefined,
    });
    router.push(`/entries/${entry.id}`);
  }

  return (
    <div className="space-y-6">
      <Field label="Walden Pond today" value={walden} onChange={setWalden} />
      <Field label="Mechanical area" value={mechanical} onChange={setMechanical} />
      <Field label="Natural anchor" value={anchor} onChange={setAnchor} />

      <ReflectionSliders
        mechanical={mechScore}
        nature={natureScore}
        margin={marginScore}
        onMechanicalChange={setMechScore}
        onNatureChange={setNatureScore}
        onMarginChange={setMarginScore}
      />

      <label className="flex items-center gap-3 rounded-xl bg-mist/50 px-4 py-3 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={practiceDone}
          onChange={(e) => setPracticeDone(e.target.checked)}
          className="h-4 w-4 rounded border-mist text-pond-700"
        />
        Practice completed
      </label>

      <div>
        <label className="text-sm text-ink/60">Optional note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-pond-500"
        />
      </div>

      <button type="button" onClick={handleSave} className="btn-primary w-full">
        Save changes
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm text-ink/60">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-pond-500"
      />
    </div>
  );
}
