import { PageCard } from "@/components/page-card";
import { TermsBanner } from "@/components/terms-banner";

export default function RegisterPage() {
  return (
    <PageCard title="Register">
      <form className="grid max-w-xl gap-3">
        <input className="rounded bg-zinc-800 p-2" placeholder="Username" />
        <input className="rounded bg-zinc-800 p-2" placeholder="Display name" />
        <input className="rounded bg-zinc-800 p-2" placeholder="Email" type="email" />
        <input className="rounded bg-zinc-800 p-2" placeholder="Password" type="password" />
        <button className="w-fit rounded bg-purple-600 px-4 py-2">Create account</button>
      </form>
      <div className="mt-4"><TermsBanner /></div>
    </PageCard>
  );
}
