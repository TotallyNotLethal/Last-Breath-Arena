import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

const cards = [
  "Ranked PvP",
  "Secure match verification",
  "Arena Credits only",
  "Seasonal ladders"
];

export default function LandingPage() {
  return (
    <SiteShell>
      <section className="rounded-xl border border-white/10 bg-zinc-900/60 p-8 text-center">
        <p className="text-sm text-purple-300">Skill. Queue. Fight. Climb.</p>
        <h1 className="mt-3 text-4xl font-extrabold">Last Breath Arena</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
          Competitive Minecraft PvP with verified plugin match reporting and virtual-only
          Arena Credits.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link className="rounded bg-purple-600 px-4 py-2" href="/register">Sign up</Link>
          <Link className="rounded border border-purple-400 px-4 py-2" href="/leaderboard">Leaderboard</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <article key={card} className="rounded-lg border border-white/10 bg-card p-4">{card}</article>
        ))}
      </section>
      <section className="rounded-lg border border-white/10 bg-card p-5 text-zinc-300">
        Link your Minecraft account by generating a one-time code on the website and running
        <code className="mx-1 rounded bg-zinc-800 px-2 py-1">/arena link CODE</code> in-game.
      </section>
    </SiteShell>
  );
}
