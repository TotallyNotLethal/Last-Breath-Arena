import Link from "next/link";
import { PageCard } from "@/components/page-card";

export default function ChallengesPage() {
  return (
    <PageCard title="Open Challenges">
      <Link className="mb-3 inline-block rounded bg-purple-600 px-3 py-2" href="/challenges/new">Create Challenge</Link>
      <div className="rounded border border-white/10 p-4">Browse public and direct invite challenges.</div>
    </PageCard>
  );
}
