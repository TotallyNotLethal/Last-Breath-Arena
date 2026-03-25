import { PageCard } from "@/components/page-card";
import { TermsBanner } from "@/components/terms-banner";

export default function LoginPage() {
  return (
    <PageCard title="Login">
      <form className="space-y-3 max-w-md">
        <input className="w-full rounded bg-zinc-800 p-2" placeholder="Email" type="email" />
        <input className="w-full rounded bg-zinc-800 p-2" placeholder="Password" type="password" />
        <button className="rounded bg-purple-600 px-4 py-2" type="submit">Log in</button>
      </form>
      <p className="mt-4 text-sm text-zinc-400">Forgot password flow is available as a placeholder endpoint.</p>
      <div className="mt-4"><TermsBanner /></div>
    </PageCard>
  );
}
