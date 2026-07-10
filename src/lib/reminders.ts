import type { ReminderSettings } from "@/types";
import { toDateKey } from "./date";

const REMINDERS_KEY = "my-walden-pond-reminders";

const defaultSettings: ReminderSettings = {
  enabled: false,
  time: "19:30",
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getReminderSettings(): ReminderSettings {
  if (!isBrowser()) return defaultSettings;
  try {
    const raw = localStorage.getItem(REMINDERS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveReminderSettings(settings: ReminderSettings): void {
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(settings));
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isBrowser() || !("Notification" in window)) return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

export function isReminderSupported(): boolean {
  return isBrowser() && "Notification" in window;
}

function parseTime(time: string): { hours: number; minutes: number } {
  const [h, m] = time.split(":").map(Number);
  return { hours: h ?? 19, minutes: m ?? 30 };
}

function isPastReminderTime(time: string, now = new Date()): boolean {
  const { hours, minutes } = parseTime(time);
  const reminder = new Date(now);
  reminder.setHours(hours, minutes, 0, 0);
  return now >= reminder;
}

export async function showDailyReminderNotification(): Promise<void> {
  if (!isBrowser() || Notification.permission !== "granted") return;

  const options: NotificationOptions = {
    body: "Take a few quiet minutes for today's reflection at the pond.",
    icon: "/icon.svg",
    badge: "/icon.svg",
    tag: "walden-daily-reminder",
    requireInteraction: false,
  };

  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.ready;
    await reg.showNotification("Your Walden Pond awaits", options);
    return;
  }

  new Notification("Your Walden Pond awaits", options);
}

export async function checkAndFireReminder(): Promise<void> {
  const settings = getReminderSettings();
  if (!settings.enabled || Notification.permission !== "granted") return;

  const today = toDateKey();
  if (settings.lastNotifiedDate === today) return;
  if (!isPastReminderTime(settings.time)) return;

  await showDailyReminderNotification();
  saveReminderSettings({ ...settings, lastNotifiedDate: today });
}

export function startReminderWatcher(): () => void {
  if (!isBrowser()) return () => {};

  void checkAndFireReminder();
  const interval = window.setInterval(() => {
    void checkAndFireReminder();
  }, 60_000);

  const onVisible = () => {
    if (document.visibilityState === "visible") {
      void checkAndFireReminder();
    }
  };
  document.addEventListener("visibilitychange", onVisible);

  return () => {
    clearInterval(interval);
    document.removeEventListener("visibilitychange", onVisible);
  };
}
