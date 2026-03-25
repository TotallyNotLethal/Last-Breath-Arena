import { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";

export function PageCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SiteShell>
      <section className="rounded-xl border border-white/10 bg-card p-6">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        {children}
      </section>
    </SiteShell>
  );
}
