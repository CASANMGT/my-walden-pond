"use client";

import { useState } from "react";
import { Leaf, Shield, Timer } from "lucide-react";
import { PondIllustration } from "./PondIllustration";
import { markOnboardingComplete } from "@/lib/onboarding";

const STEPS = [
  {
    icon: Timer,
    title: "3–7 minutes a day",
    body: "A short guided reflection. Tap your answers — typing is always optional.",
  },
  {
    icon: Shield,
    title: "Yours alone on this device",
    body: "Your journal stays in your browser. Nothing is uploaded or shared.",
  },
  {
    icon: Leaf,
    title: "Begin at the pond",
    body: "Each day brings one lesson from Walden. Start with today's review when you're ready.",
  },
] as const;

type Props = {
  onComplete: () => void;
};

export function OnboardingOverlay({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  function finish() {
    markOnboardingComplete();
    onComplete();
  }

  function handleNext() {
    if (isLast) {
      finish();
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div
        className="animate-fade-up w-full max-w-lg overflow-hidden rounded-3xl bg-paper shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        <div className="flex justify-center px-6 pt-6">
          <PondIllustration variant="circle" className="h-32 w-32" />
        </div>

        <div className="space-y-4 px-6 py-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pond-50 text-pond-700">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="section-label">Welcome</p>
            <h2 id="onboarding-title" className="mt-1 font-serif text-2xl text-pond-900">
              {current.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{current.body}</p>
          </div>

          <div className="flex justify-center gap-1.5 pt-1">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-pond-500" : "w-1.5 bg-mist"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-mist/80 p-4">
          <button type="button" onClick={handleNext} className="btn-primary w-full">
            {isLast ? "Start at the pond" : "Continue"}
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={finish}
              className="mt-2 w-full py-2 text-sm text-ink/45 hover:text-ink/65"
            >
              Skip intro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
