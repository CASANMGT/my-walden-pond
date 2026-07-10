"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  Layers,
  Menu,
  NotebookPen,
  Settings,
  TreePine,
} from "lucide-react";
import { SideMenu } from "./SideMenu";
import { OfflineBanner, PwaBootstrap, useOnlineStatus } from "./PwaBootstrap";
import { getEntries } from "@/lib/storage";

const navItems = [
  { href: "/", label: "Today", icon: TreePine },
  { href: "/chapters", label: "Lessons", icon: BookOpen },
  { href: "/entries", label: "Journal", icon: NotebookPen },
  { href: "/themes", label: "Themes", icon: Layers },
  { href: "/settings", label: "Profile", icon: Settings },
];

type ShellContextValue = {
  openMenu: () => void;
};

const ShellContext = createContext<ShellContextValue>({ openMenu: () => {} });

export function useAppShell() {
  return useContext(ShellContext);
}

export function BottomNav() {
  const pathname = usePathname();
  const hideOnReview = pathname.startsWith("/review");

  if (hideOnReview) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-mist/90 bg-paper/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-lg items-center justify-around px-1 py-1.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[10px] font-medium transition-all ${
                active
                  ? "bg-pond-700/8 text-pond-700"
                  : "text-ink/45 hover:text-ink/65"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${active ? "stroke-[2px] text-pond-700" : "stroke-[1.5px]"}`}
              />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppHeader({ title }: { title?: string }) {
  const { openMenu } = useAppShell();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-mist/70 bg-paper/92 px-4 py-3 backdrop-blur-lg">
      <button
        type="button"
        onClick={openMenu}
        className="rounded-lg p-1.5 text-ink/50 transition hover:bg-mist/60"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <span className="font-serif text-sm font-semibold tracking-wide text-pond-900">
        {title ?? "My Walden Pond"}
      </span>
      <Link
        href="/settings#reminders"
        className="rounded-lg p-1.5 text-ink/50 transition hover:bg-mist/60"
        aria-label="Reminders"
      >
        <Bell className="h-5 w-5" strokeWidth={1.5} />
      </Link>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const online = useOnlineStatus();

  useEffect(() => {
    setEntryCount(getEntries().length);
    const refresh = () => setEntryCount(getEntries().length);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return (
    <ShellContext.Provider value={{ openMenu: () => setMenuOpen(true) }}>
      <PwaBootstrap />
      <div className="paper-surface pond-gradient mx-auto min-h-dvh max-w-lg">
        <OfflineBanner online={online} />
        <main className="relative z-10 pb-24">{children}</main>
        <BottomNav />
        <SideMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          isOnline={online}
          entryCount={entryCount}
        />
      </div>
    </ShellContext.Provider>
  );
}
