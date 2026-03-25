import { PageCard } from "@/components/page-card";

export default function CreateChallengePage() {
  return (
    <PageCard title="Create Challenge">
      <form className="grid max-w-2xl gap-3">
        <input className="rounded bg-zinc-800 p-2" type="number" placeholder="Stake (Arena Credits)" />
        <select className="rounded bg-zinc-800 p-2"><option>NETH_POT</option><option>DIAMOND_POT</option><option>CRYSTAL</option><option>UHC</option><option>SWORD</option><option>CUSTOM</option></select>
        <input className="rounded bg-zinc-800 p-2" placeholder="Arena" />
        <textarea className="rounded bg-zinc-800 p-2" placeholder="Notes" />
      </form>
    </PageCard>
  );
}
