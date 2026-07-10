const ONBOARDING_KEY = "my-walden-pond-onboarding-complete";

function isBrowser() {
  return typeof window !== "undefined";
}

export function hasCompletedOnboarding(): boolean {
  if (!isBrowser()) return true;
  return localStorage.getItem(ONBOARDING_KEY) === "true";
}

export function markOnboardingComplete(): void {
  if (!isBrowser()) return;
  localStorage.setItem(ONBOARDING_KEY, "true");
}
