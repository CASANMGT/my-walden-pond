"use client";

import { APP_VERSION } from "./app-meta";

export { APP_NAME, APP_VERSION, getFullVersionLabel, getVersionLabel } from "./app-meta";

const LAST_SEEN_VERSION_KEY = "my-walden-pond-last-seen-version";

export function getLastSeenVersion(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LAST_SEEN_VERSION_KEY);
}

export function markVersionSeen(version = APP_VERSION): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_SEEN_VERSION_KEY, version);
}

export function hasUnseenUpdate(): boolean {
  const last = getLastSeenVersion();
  if (!last) return true;
  return last !== APP_VERSION;
}
