import {
  Building2,
  Clock,
  Compass,
  Leaf,
  Mountain,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";

const themeIcons: Record<string, LucideIcon> = {
  "nature-medicine": Leaf,
  "simplicity-soul": Sparkles,
  "living-deliberately": Compass,
  "authenticity-selfhood": User,
  "imagination-sacred": Mountain,
  "work-society": Building2,
  "friendship-time": Clock,
};

export function ThemeIcon({
  themeId,
  className = "h-5 w-5",
}: {
  themeId: string;
  className?: string;
}) {
  const Icon = themeIcons[themeId] ?? Leaf;
  return <Icon className={className} strokeWidth={1.5} />;
}

export function getThemeAccent(themeId: string): string {
  const accents: Record<string, string> = {
    "nature-medicine": "border-l-pond-500",
    "simplicity-soul": "border-l-sunlight",
    "living-deliberately": "border-l-moss",
    "authenticity-selfhood": "border-l-pond-700",
    "imagination-sacred": "border-l-[#8a9cb0]",
    "work-society": "border-l-[#6b5b4f]",
    "friendship-time": "border-l-[#9a8b7a]",
  };
  return accents[themeId] ?? "border-l-pond-500";
}
