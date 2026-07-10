"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Droplets, Leaf, Pencil } from "lucide-react";
import type { ChapterModule, ReflectionEntry } from "@/types";
import { DetailHeader } from "./DetailHeader";
import { ReflectionOptions, SingleSelectOptions } from "./ReflectionOptions";
import { ReflectionSliders } from "./ReflectionSliders";
import { NaturePractice } from "./NaturePractice";
import {
  getEntryForDate,
  replaceTodayEntry,
  saveEntry,
} from "@/lib/storage";
import { toDateKey } from "@/lib/date";
import { formatSelection, mergeOptions } from "@/lib/selection";
import { mechanicalOptions, natureOptions, waldenOptions } from "@/data/options";

const STEPS = ["learning", "walden", "mechanical", "nature", "sliders", "practice"] as const;
type Step = (typeof STEPS)[number];

type Props = {
  chapter: ChapterModule;
  replaceToday?: boolean;
};

export function ReviewFlow({ chapter, replaceToday }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const [todayEntry, setTodayEntry] = useState<ReflectionEntry | undefined>();
  const [mounted, setMounted] = useState(false);

  const [learning, setLearning] = useState("");
  const [walden, setWalden] = useState<string[]>([]);
  const [mechanical, setMechanical] = useState<string[]>([]);
  const [nature, setNature] = useState<string[]>([]);
  const [mechScore, setMechScore] = useState(3);
  const [natureScore, setNatureScore] = useState(3);
  const [marginScore, setMarginScore] = useState(3);
  const [practiceDone, setPracticeDone] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedEntryId, setSavedEntryId] = useState<string | null>(null);

  useEffect(() => {
    setTodayEntry(getEntryForDate(toDateKey()));
    setMounted(true);
  }, []);

  const waldenOpts = useMemo(
    () => mergeOptions(chapter.waldenOptions, waldenOptions),
    [chapter]
  );
  const mechOpts = useMemo(
    () => mergeOptions(chapter.mechanicalOptions, mechanicalOptions),
    [chapter]
  );
  const natureOpts = useMemo(
    () => mergeOptions(chapter.natureOptions, natureOptions),
    [chapter]
  );

  const canNext = useCallback(() => {
    if (step === "learning") return !!learning;
    if (step === "walden") return walden.length > 0;
    if (step === "mechanical") return mechanical.length > 0;
    if (step === "nature") return nature.length > 0;
    return true;
  }, [step, learning, walden, mechanical, nature]);

  function buildEntry(): ReflectionEntry {
    const today = toDateKey();
    const existing = todayEntry;
    return {
      id: replaceToday && existing ? existing.id : crypto.randomUUID(),
      date: today,
      chapterNumber: chapter.chapterNumber,
      chapterTitle: chapter.chapterTitle,
      themeId: chapter.themeId,
      themeName: chapter.themeName,
      learningTakeaway: learning,
      waldenPondToday: formatSelection(walden),
      mechanicalArea: formatSelection(mechanical),
      naturalAnchor: formatSelection(nature),
      mechanicalScore: mechScore,
      natureScore: natureScore,
      marginScore: marginScore,
      practiceCompleted: practiceDone,
      optionalNote: note.trim() || undefined,
      createdAt: replaceToday && existing ? existing.createdAt : new Date().toISOString(),
    };
  }

  function handleSave() {
    const entry = buildEntry();
    if (replaceToday && todayEntry) {
      replaceTodayEntry(entry);
    } else {
      saveEntry(entry);
    }
    setSavedEntryId(entry.id);
    setSaved(true);
  }

  if (!mounted) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-ink/40">
        Preparing review...
      </div>
    );
  }

  if (todayEntry && !replaceToday) {
    return (
      <div className="pond-gradient flex min-h-dvh flex-col">
        <DetailHeader backHref="/" backLabel="Today" />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pond-50">
            <Leaf className="h-10 w-10 text-pond-500" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-2xl text-pond-900">You&apos;ve reflected today</h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/55">
            One reflection per day keeps your streak and weekly map clear. Edit
            today&apos;s entry or replace it if you want a fresh pass.
          </p>
          <div className="mt-8 w-full max-w-xs space-y-3">
            <Link href={`/entries/${todayEntry.id}`} className="btn-primary">
              View today&apos;s reflection
            </Link>
            <Link href={`/entries/${todayEntry.id}/edit`} className="btn-secondary">
              <Pencil className="h-4 w-4" />
              Edit today&apos;s reflection
            </Link>
            <Link
              href={`/review?chapter=${chapter.chapterNumber}&replace=1`}
              className="flex w-full items-center justify-center py-2 text-sm text-moss hover:text-pond-700"
            >
              Replace today&apos;s reflection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="pond-gradient flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pond-50">
          <Leaf className="h-10 w-10 text-pond-500" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-3xl text-pond-900">Saved.</h1>
        <p className="mt-2 text-ink/55">Your pond is still here.</p>
        <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
          {savedEntryId && (
            <Link href={`/entries/${savedEntryId}`} className="btn-primary">
              View reflection
            </Link>
          )}
          <Link href="/" className="btn-secondary">
            Return to Today
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pond-gradient min-h-dvh">
      <DetailHeader
        backHref="/"
        backLabel="Today"
        center={`Ch. ${chapter.chapterNumber}`}
      />

      <div className="border-b border-mist/70 bg-paper/80 px-4 py-3">
        <p className="section-label text-center">Daily Review</p>
        <p className="text-center font-serif text-sm text-pond-900">
          {chapter.chapterTitle}
        </p>
        <p className="mt-2 text-center text-xs text-ink/45">
          Step {stepIndex + 1} of {STEPS.length}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-mist">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pond-500 to-pond-700 transition-all duration-500"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        {replaceToday && (
          <p className="mt-2 text-center text-[11px] text-sunlight">
            Replacing today&apos;s reflection
          </p>
        )}
      </div>

      <div className="space-y-6 px-4 py-6">
        {step === "learning" && (
          <>
            <StepHeader
              icon={<Leaf className="h-6 w-6 text-pond-500" />}
              title="What resonates from today's lesson?"
              subtitle="Choose one takeaway."
            />
            <Link
              href={`/chapters/${chapter.chapterNumber}`}
              className="block text-center text-xs font-medium text-pond-700 underline"
            >
              Read today&apos;s lesson
            </Link>
            <SingleSelectOptions
              options={chapter.learningOptions}
              selected={learning}
              onChange={setLearning}
            />
          </>
        )}

        {step === "walden" && (
          <>
            <StepHeader
              icon={<Leaf className="h-6 w-6 text-pond-500" />}
              title="What is your Walden Pond today?"
              subtitle="Choose all that apply."
            />
            <ReflectionOptions
              options={waldenOpts}
              selected={walden}
              onChange={setWalden}
            />
          </>
        )}

        {step === "mechanical" && (
          <>
            <StepHeader
              icon={<Droplets className="h-6 w-6 text-moss" />}
              title="Where did life feel mechanical today?"
              subtitle="Choose all that apply."
            />
            <ReflectionOptions
              options={mechOpts}
              selected={mechanical}
              onChange={setMechanical}
            />
          </>
        )}

        {step === "nature" && (
          <>
            <StepHeader
              icon={<Leaf className="h-6 w-6 text-sunlight" />}
              title="What natural thing can steady you?"
              subtitle="Choose all that apply."
            />
            <ReflectionOptions
              options={natureOpts}
              selected={nature}
              onChange={setNature}
            />
          </>
        )}

        {step === "sliders" && (
          <>
            <StepHeader
              icon={<Droplets className="h-6 w-6 text-pond-500" />}
              title="How does today feel?"
              subtitle="Slide to reflect."
            />
            <ReflectionSliders
              mechanical={mechScore}
              nature={natureScore}
              margin={marginScore}
              onMechanicalChange={setMechScore}
              onNatureChange={setNatureScore}
              onMarginChange={setMarginScore}
            />
          </>
        )}

        {step === "practice" && (
          <>
            <StepHeader
              icon={<Leaf className="h-6 w-6 text-pond-500" />}
              title="Today's practice"
              subtitle={chapter.mantra}
            />
            <NaturePractice
              practice={chapter.practice}
              completed={practiceDone}
              onToggle={setPracticeDone}
            />
            <div>
              <label className="text-sm text-ink/60">
                Optional note. Share anything on your mind.
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-pond-500"
                placeholder="One sentence is enough..."
              />
            </div>
          </>
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-mist/80 bg-paper/95 p-4 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg gap-3">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => setStepIndex((i) => i - 1)}
              className="btn-secondary flex-1"
            >
              Back
            </button>
          )}
          {step !== "practice" ? (
            <button
              type="button"
              disabled={!canNext()}
              onClick={() => setStepIndex((i) => i + 1)}
              className="btn-primary flex flex-1 items-center gap-2 disabled:opacity-40"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary flex flex-1 items-center gap-2"
            >
              <Leaf className="h-4 w-4" />
              {replaceToday ? "Replace reflection" : "Save my review"}
            </button>
          )}
        </div>
      </footer>
      <div className="h-24" />
    </div>
  );
}

function StepHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <div className="mb-3 flex justify-center">{icon}</div>
      <h1 className="font-serif text-xl text-pond-900">{title}</h1>
      <p className="mt-1 text-sm text-ink/50">{subtitle}</p>
    </div>
  );
}
