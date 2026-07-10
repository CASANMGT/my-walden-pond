import packageJson from "../../package.json";

export const APP_VERSION = packageJson.version;
export const APP_NAME = "My Walden Pond";

const LAST_SEEN_VERSION_KEY = "my-walden-pond-last-seen-version";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getLastSeenVersion(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(LAST_SEEN_VERSION_KEY);
}

export function markVersionSeen(version = APP_VERSION): void {
  if (!isBrowser()) return;
  localStorage.setItem(LAST_SEEN_VERSION_KEY, version);
}

export function hasUnseenUpdate(): boolean {
  const last = getLastSeenVersion();
  if (!last) return true;
  return last !== APP_VERSION;
}

export function getVersionLabel(): string {
  return `v${APP_VERSION}`;
}

export function getFullVersionLabel(): string {
  return `${APP_NAME} v${APP_VERSION}`;
}
