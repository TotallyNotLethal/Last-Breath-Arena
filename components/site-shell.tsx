import Link from "next/link";
import { ReactNode } from "react";
import { TermsBanner } from "@/components/terms-banner";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Challenges", "/challenges"],
  ["Leaderboard", "/leaderboard"],
  ["Seasons", "/seasons"],
  ["Disputes", "/disputes"]
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <header className="mb-8 rounded-xl border border-white/10 bg-gradient-to-r from-purple-900/50 to-cyan-900/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold">Last Breath Arena</Link>
          <nav className="flex gap-4 text-sm text-zinc-200">
            {nav.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="space-y-6">{children}</main>
      <footer className="my-10 space-y-3 border-t border-white/10 pt-6 text-xs text-zinc-300">
        <TermsBanner />
      </footer>
    </div>
  );
}
