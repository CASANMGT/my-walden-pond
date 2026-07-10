"use client";

import { useEffect, useState } from "react";
import { startReminderWatcher } from "@/lib/reminders";

export function PwaBootstrap() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Service worker optional in some environments
    });
  }, []);

  useEffect(() => startReminderWatcher(), []);

  return null;
}

export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return online;
}

export function OfflineBanner({ online }: { online: boolean }) {
  if (online) return null;

  return (
    <div className="bg-pond-900 px-4 py-2 text-center text-xs text-paper/90">
      You&apos;re offline. Reflections and lessons still work on this device.
    </div>
  );
}
