"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/AppShell";
import {
  downloadMarkdown,
  exportEntriesToMarkdown,
} from "@/lib/exportMarkdown";
import {
  getReminderSettings,
  isReminderSupported,
  requestNotificationPermission,
  saveReminderSettings,
} from "@/lib/reminders";
import { getEntries, resetAllData } from "@/lib/storage";
import { APP_VERSION } from "@/lib/version";
import type { ReminderSettings } from "@/types";
import { Bell, Download, Map, Trash2, Wifi } from "lucide-react";

export default function SettingsPage() {
  const [entryCount, setEntryCount] = useState(0);
  const [reminders, setReminders] = useState<ReminderSettings>({
    enabled: false,
    time: "19:30",
  });
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    setEntryCount(getEntries().length);
    setReminders(getReminderSettings());
    if (typeof Notification !== "undefined") {
      setNotifPermission(Notification.permission);
    }
  }, []);

  function handleExport() {
    const md = exportEntriesToMarkdown(getEntries());
    downloadMarkdown(md);
  }

  function handleReset() {
    const confirmed = confirm(
      "Are you sure you want to delete all saved reflections? This cannot be undone."
    );
    if (!confirmed) return;
    resetAllData();
    setEntryCount(0);
  }

  async function handleReminderToggle(enabled: boolean) {
    if (enabled) {
      const permission = await requestNotificationPermission();
      setNotifPermission(permission);
      if (permission !== "granted") {
        return;
      }
    }
    const next = { ...reminders, enabled, lastNotifiedDate: undefined };
    setReminders(next);
    saveReminderSettings(next);
  }

  function handleTimeChange(time: string) {
    const next = { ...reminders, time, lastNotifiedDate: undefined };
    setReminders(next);
    saveReminderSettings(next);
  }

  return (
    <>
      <AppHeader title="Settings" />
      <div className="space-y-6 px-4 pt-4 pb-8">
        <section id="reminders" className="card-elevated rounded-2xl p-5">
          <h2 className="font-serif text-lg text-pond-900">Reminders</h2>
          <p className="mt-1 text-sm text-ink/50">
            A gentle nudge for your daily review. Works best when installed as an app.
          </p>

          {!isReminderSupported() ? (
            <p className="mt-4 text-sm text-ink/50">
              Notifications are not supported in this browser.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <label className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm text-ink/75">
                  <Bell className="h-4 w-4 text-moss" />
                  Daily reminder
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={reminders.enabled}
                  onClick={() => handleReminderToggle(!reminders.enabled)}
                  className={`relative h-7 w-12 rounded-full transition ${
                    reminders.enabled ? "bg-pond-700" : "bg-mist"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                      reminders.enabled ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </label>

              <label className="block">
                <span className="text-xs text-ink/45">Reminder time</span>
                <input
                  type="time"
                  value={reminders.time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  disabled={!reminders.enabled}
                  className="mt-1.5 w-full rounded-xl border border-mist bg-white/80 px-4 py-3 text-sm outline-none focus:border-pond-500 disabled:opacity-50"
                />
              </label>

              {notifPermission === "denied" && (
                <p className="text-xs text-red-600/80">
                  Notifications are blocked. Enable them in your browser settings.
                </p>
              )}
            </div>
          )}
        </section>

        <section className="card-elevated rounded-2xl p-5">
          <h2 className="font-serif text-lg text-pond-900">Offline & Local Data</h2>
          <p className="mt-1 text-sm text-ink/50">
            Everything stays on your device. The app works without internet after first load.
          </p>
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-pond-50/80 p-4">
            <Wifi className="mt-0.5 h-5 w-5 shrink-0 text-pond-700" />
            <div className="text-sm text-ink/70">
              <p className="font-medium text-pond-900">Offline-first</p>
              <p className="mt-1 leading-relaxed">
                Lessons, journal entries, and progress are stored locally. Install to your home
                screen for the best experience.
              </p>
            </div>
          </div>
        </section>

        <section className="card-elevated rounded-2xl p-5">
          <h2 className="font-serif text-lg text-pond-900">Journal & Data</h2>
          <p className="mt-1 text-sm text-ink/50">
            Your reflections stay on this device. Export anytime.
          </p>
          <button type="button" onClick={handleExport} className="btn-primary mt-4">
            <Download className="h-4 w-4" />
            Export My Reflections ({entryCount})
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-red-200 py-3 text-sm font-medium text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Reset All Data
          </button>
        </section>

        <section className="card-elevated rounded-2xl p-5">
          <h2 className="font-serif text-lg text-pond-900">Explore</h2>
          <Link href="/map" className="btn-secondary mt-4">
            <Map className="h-4 w-4" />
            Weekly Walden Map
          </Link>
        </section>

        <section className="card-elevated rounded-2xl p-5">
          <h2 className="font-serif text-lg text-pond-900">About My Walden Pond</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            A personal study and daily reflection companion inspired by{" "}
            <em>The Cure at Walden Pond</em> by Thomas Moore.
          </p>
          <p className="mt-3 text-xs text-ink/40">
            Version {APP_VERSION} · Offline-first PWA
          </p>
        </section>

        <section className="rounded-2xl border border-mist bg-mist/30 p-5">
          <h2 className="text-sm font-medium text-ink/70">Copyright note</h2>
          <p className="mt-2 text-xs leading-relaxed text-ink/50">
            Original summaries only. No full book text. Your notes belong to you.
          </p>
        </section>

        <blockquote className="text-center font-serif text-sm italic text-moss">
          &ldquo;Simplify, simplify.&rdquo;
        </blockquote>
      </div>
    </>
  );
}
