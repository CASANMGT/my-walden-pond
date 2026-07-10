"use client";

import { AppHeader } from "@/components/AppShell";
import { VersionPanel } from "@/components/VersionPanel";
import { APP_NAME } from "@/lib/version";
import { PondIllustration } from "@/components/PondIllustration";

export default function AboutPage() {
  return (
    <>
      <AppHeader title="About" />
      <div className="animate-fade-up space-y-6 px-4 pt-4 pb-8">
        <div className="card-elevated overflow-hidden rounded-3xl text-center">
          <div className="flex justify-center px-6 pt-6">
            <PondIllustration variant="circle" className="h-36 w-36" />
          </div>
          <div className="px-5 pb-5">
            <p className="font-serif text-xl text-pond-900">{APP_NAME}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              A personal study and daily reflection companion inspired by{" "}
              <em>The Cure at Walden Pond</em>.
            </p>
          </div>
        </div>

        <VersionPanel showHistory />
      </div>
    </>
  );
}
