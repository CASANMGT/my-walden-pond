import {
  mechanicalOptions,
  natureOptions,
  waldenOptions,
} from "@/data/options";

const ALL_PRESET_OPTIONS = new Set([
  ...waldenOptions,
  ...mechanicalOptions,
  ...natureOptions,
  "Custom",
]);

export function formatSelection(selected: string[]): string {
  const custom = selected.find(
    (s) => s !== "Custom" && !ALL_PRESET_OPTIONS.has(s)
  );
  const labels = selected.filter((s) => s !== "Custom" && s !== custom);
  if (custom) labels.push(custom);
  if (selected.includes("Custom") && !custom) labels.push("Custom");
  return labels.join(", ");
}

export function parseMultiSelection(
  formatted: string,
  presets: string[]
): string[] {
  if (!formatted.trim()) return [];

  const presetSet = new Set(presets);
  const tokens = formatted.split(", ").map((t) => t.trim()).filter(Boolean);
  const selected: string[] = [];

  for (const token of tokens) {
    if (presetSet.has(token)) {
      if (!selected.includes(token)) selected.push(token);
    } else if (token === "Custom") {
      if (!selected.includes("Custom")) selected.push("Custom");
    } else {
      if (!selected.includes("Custom")) selected.push("Custom");
      if (!selected.includes(token)) selected.push(token);
    }
  }

  return selected;
}

export function mergeOptions(chapterOptions: string[], globalOptions: string[]): string[] {
  return [...new Set([...chapterOptions, ...globalOptions])];
}
