"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Download,
  Layers,
  Map,
  NotebookPen,
  Settings,
  TreePine,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { APP_VERSION } from "@/lib/version";

const menuLinks = [
  { href: "/", label: "Today", icon: TreePine },
  { href: "/chapters", label: "Lessons", icon: BookOpen },
  { href: "/entries", label: "Journal", icon: NotebookPen },
  { href: "/themes", label: "Themes", icon: Layers },
  { href: "/map", label: "Weekly Map", icon: Map },
  { href: "/settings", label: "Settings", icon: Settings },
];

type Props = {
  open: boolean;
  onClose: () => void;
  isOnline: boolean;
  entryCount: number;
};

export function SideMenu({ open, onClose, isOnline, entryCount }: Props) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu"
      />
      <aside className="fixed left-0 top-0 z-[70] flex h-full w-[min(300px,85vw)] flex-col bg-paper shadow-2xl animate-fade-up">
        <div className="flex items-center justify-between border-b border-mist/80 px-5 py-4">
          <div className="flex items-center gap-2">
            <TreePine className="h-5 w-5 text-pond-700" strokeWidth={1.5} />
            <span className="font-serif text-base font-semibold text-pond-900">
              My Walden Pond
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink/50 hover:bg-mist/60"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-mist/60 px-5 py-3">
          <div
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs ${
              isOnline ? "bg-pond-50 text-pond-700" : "bg-mist/80 text-ink/60"
            }`}
          >
            {isOnline ? (
              <Wifi className="h-3.5 w-3.5" />
            ) : (
              <WifiOff className="h-3.5 w-3.5" />
            )}
            <span>
              {isOnline
                ? "Online — data saved on this device"
                : "Offline — your pond still works"}
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuLinks.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  active
                    ? "bg-pond-700/8 font-medium text-pond-700"
                    : "text-ink/70 hover:bg-mist/50"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.5} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-mist/80 p-4">
          <p className="px-1 text-xs text-ink/40">
            {entryCount} reflection{entryCount !== 1 ? "s" : ""} saved locally
          </p>
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink/60 hover:bg-mist/50"
          >
            <Download className="h-4 w-4" />
            Export reflections
          </Link>
          <p className="px-1 text-center text-[10px] text-ink/35">v{APP_VERSION}</p>
          <p className="px-1 text-center font-serif text-xs italic text-moss">
            Simplify, simplify.
          </p>
        </div>
      </aside>
    </>
  );
}
