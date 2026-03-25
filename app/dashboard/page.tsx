import { PageCard } from "@/components/page-card";

export default function DashboardPage() {
  return (
    <PageCard title="Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        <Stat title="Arena Credits" value="1,250" />
        <Stat title="Season Rank" value="#17" />
        <Stat title="W-L-D" value="22-8-1" />
      </div>
    </PageCard>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return <div className="rounded border border-white/10 bg-zinc-900 p-4"><p className="text-sm text-zinc-400">{title}</p><p className="text-2xl font-bold">{value}</p></div>;
}
