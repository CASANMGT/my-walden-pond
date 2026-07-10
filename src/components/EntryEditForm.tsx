"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReflectionEntry } from "@/types";
import { getChapterByNumber } from "@/data/chapters";
import { mechanicalOptions, natureOptions, waldenOptions } from "@/data/options";
import { ReflectionOptions, SingleSelectOptions } from "./ReflectionOptions";
import { ReflectionSliders } from "./ReflectionSliders";
import { NaturePractice } from "./NaturePractice";
import { updateEntry } from "@/lib/storage";
import { formatSelection, mergeOptions, parseMultiSelection } from "@/lib/selection";

type Props = {
  entry: ReflectionEntry;
};

export function EntryEditForm({ entry }: Props) {
  const router = useRouter();
  const chapter = getChapterByNumber(entry.chapterNumber);

  const [learning, setLearning] = useState(entry.learningTakeaway);
  const [walden, setWalden] = useState(() =>
    parseMultiSelection(
      entry.waldenPondToday,
      mergeOptions(chapter?.waldenOptions ?? [], waldenOptions)
    )
  );
  const [mechanical, setMechanical] = useState(() =>
    parseMultiSelection(
      entry.mechanicalArea,
      mergeOptions(chapter?.mechanicalOptions ?? [], mechanicalOptions)
    )
  );
  const [nature, setNature] = useState(() =>
    parseMultiSelection(
      entry.naturalAnchor,
      mergeOptions(chapter?.natureOptions ?? [], natureOptions)
    )
  );
  const [mechScore, setMechScore] = useState(entry.mechanicalScore);
  const [natureScore, setNatureScore] = useState(entry.natureScore);
  const [marginScore, setMarginScore] = useState(entry.marginScore);
  const [practiceDone, setPracticeDone] = useState(entry.practiceCompleted);
  const [note, setNote] = useState(entry.optionalNote ?? "");

  const waldenOpts = useMemo(
    () => mergeOptions(chapter?.waldenOptions ?? [], waldenOptions),
    [chapter]
  );
  const mechOpts = useMemo(
    () => mergeOptions(chapter?.mechanicalOptions ?? [], mechanicalOptions),
    [chapter]
  );
  const natureOpts = useMemo(
    () => mergeOptions(chapter?.natureOptions ?? [], natureOptions),
    [chapter]
  );

  function handleSave() {
    if (!learning || walden.length === 0 || mechanical.length === 0 || nature.length === 0) {
      return;
    }
    updateEntry(entry.id, {
      learningTakeaway: learning,
      waldenPondToday: formatSelection(walden),
      mechanicalArea: formatSelection(mechanical),
      naturalAnchor: formatSelection(nature),
      mechanicalScore: mechScore,
      natureScore: natureScore,
      marginScore: marginScore,
      practiceCompleted: practiceDone,
      optionalNote: note.trim() || undefined,
    });
    router.push(`/entries/${entry.id}`);
  }

  const canSave =
    !!learning && walden.length > 0 && mechanical.length > 0 && nature.length > 0;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="section-label mb-3">Learning takeaway</h2>
        <SingleSelectOptions
          options={chapter?.learningOptions ?? [entry.learningTakeaway]}
          selected={learning}
          onChange={setLearning}
        />
      </section>

      <section>
        <h2 className="section-label mb-3">Walden Pond today</h2>
        <ReflectionOptions options={waldenOpts} selected={walden} onChange={setWalden} />
      </section>

      <section>
        <h2 className="section-label mb-3">Mechanical area</h2>
        <ReflectionOptions
          options={mechOpts}
          selected={mechanical}
          onChange={setMechanical}
        />
      </section>

      <section>
        <h2 className="section-label mb-3">Natural anchor</h2>
        <ReflectionOptions options={natureOpts} selected={nature} onChange={setNature} />
      </section>

      <section>
        <h2 className="section-label mb-3">How today feels</h2>
        <ReflectionSliders
          mechanical={mechScore}
          nature={natureScore}
          margin={marginScore}
          onMechanicalChange={setMechScore}
          onNatureChange={setNatureScore}
          onMarginChange={setMarginScore}
        />
      </section>

      {chapter && (
        <section>
          <h2 className="section-label mb-3">Today&apos;s practice</h2>
          <NaturePractice
            practice={chapter.practice}
            completed={practiceDone}
            onToggle={setPracticeDone}
          />
        </section>
      )}

      <section>
        <label className="text-sm text-ink/60">Optional note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-pond-500"
        />
      </section>

      <button
        type="button"
        onClick={handleSave}
        disabled={!canSave}
        className="btn-primary w-full disabled:opacity-40"
      >
        Save changes
      </button>
    </div>
  );
}
