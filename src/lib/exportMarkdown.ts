import type { ReflectionEntry } from "@/types";

export function exportEntriesToMarkdown(entries: ReflectionEntry[]): string {
  const lines: string[] = ["# My Walden Pond Reflections", ""];

  if (!entries.length) {
    lines.push("_No reflections saved yet._");
    return lines.join("\n");
  }

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  for (const entry of sorted) {
    lines.push(`## ${entry.date}`, "");
    lines.push(`Chapter ${entry.chapterNumber}: ${entry.chapterTitle}  `);
    lines.push(`Theme: ${entry.themeName}`, "");
    lines.push(`Learning takeaway: ${entry.learningTakeaway}`);
    lines.push(`My Walden Pond today: ${entry.waldenPondToday}`);
    lines.push(`Mechanical area: ${entry.mechanicalArea}`);
    lines.push(`Natural anchor: ${entry.naturalAnchor}`, "");
    lines.push("Scores:");
    lines.push(`- Mechanical feeling: ${entry.mechanicalScore}/5`);
    lines.push(`- Nature connection: ${entry.natureScore}/5`);
    lines.push(`- Inner margin: ${entry.marginScore}/5`, "");
    lines.push(`Practice completed: ${entry.practiceCompleted ? "Yes" : "No"}`, "");
    if (entry.optionalNote?.trim()) {
      lines.push("Note:");
      lines.push(entry.optionalNote.trim());
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function exportEntryToMarkdown(entry: ReflectionEntry): string {
  return exportEntriesToMarkdown([entry]);
}

export function entryMarkdownFilename(entry: ReflectionEntry): string {
  return `walden-pond-${entry.date}-ch${entry.chapterNumber}.md`;
}

export function downloadMarkdown(content: string, filename = "my-walden-pond-reflections.md"): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
