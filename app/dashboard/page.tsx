import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RepositoryCreator } from "@/components/sections/RepositoryCreator";
import { VectorIcon } from "@/components/ui/VectorIcon";
import { getDashboardData } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const dashboard = await getDashboardData();
  const connected = dashboard.health?.status === "ok";

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-cyan-glow">
                GitClone Dashboard
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold text-white sm:text-5xl">
                Fullstack control center for real repository records.
              </h1>
              <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
                This page reads from the GitClone API and can create repository
                records that persist on the server.
              </p>
              <p className="mt-4 w-fit rounded-full border border-cyan-glow/20 bg-cyan-glow/10 px-4 py-2 text-sm text-cyan-50">
                Signed in as {user.name}
              </p>
            </div>

            <div className="glass-panel rounded-3xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase text-muted">API service</p>
                  <p className="mt-2 font-mono text-sm text-cyan-glow">
                    {connected ? "Connected" : "Offline"}
                  </p>
                </div>
                <div
                  className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${
                    connected
                      ? "border-mint/30 bg-mint/10 text-mint"
                      : "border-rose-signal/30 bg-rose-signal/10 text-rose-signal"
                  }`}
                >
                  {connected ? "API Connected" : "API Offline"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Repositories" value={dashboard.stats?.repositories ?? 0} icon="repo" />
            <StatCard
              label="Private repos"
              value={dashboard.stats?.privateRepositories ?? 0}
              icon="shield"
            />
            <StatCard label="Open issues" value={dashboard.stats?.openIssues ?? 0} icon="issue" />
            <StatCard
              label="Active PRs"
              value={dashboard.stats?.activePullRequests ?? 0}
              icon="pull"
            />
            <StatCard
              label="Ready deploys"
              value={dashboard.stats?.readyDeployments ?? 0}
              icon="deploy"
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <section className="glass-panel rounded-3xl p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase text-cyan-glow">Repositories</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Live repository data</h2>
                </div>
                <Link
                  href="/"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-cyan-glow/30 bg-white/5 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-cyan-glow/70 hover:bg-cyan-glow/10"
                >
                  Back to Landing
                </Link>
              </div>

              <div className="mt-6 grid gap-4">
                {dashboard.repositories.length > 0 ? (
                  dashboard.repositories.map((repository) => (
                    <article
                      key={repository.id}
                      className="rounded-3xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="break-words text-lg font-semibold text-white">
                            {repository.owner}/{repository.name}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {repository.description}
                          </p>
                        </div>
                        <span className="w-fit rounded-full border border-cyan-glow/20 bg-cyan-glow/10 px-3 py-1 font-mono text-xs uppercase text-cyan-glow">
                          {repository.visibility}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 font-mono text-xs text-muted sm:grid-cols-4">
                        <Metric label="Language" value={repository.language} />
                        <Metric label="Branch" value={repository.defaultBranch} />
                        <Metric label="Storage" value={`${repository.storageMb} MB`} />
                        <Metric label="Stars" value={repository.stars.toLocaleString("en-US")} />
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-3xl border border-rose-signal/20 bg-rose-signal/10 p-5 text-sm leading-6 text-muted">
                    API service belum mengirim repository. Jalankan service produksi
                    terlebih dahulu.
                  </div>
                )}
              </div>
            </section>

            <RepositoryCreator />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({
  label,
  value,
  icon
}: {
  label: string;
  value: number;
  icon: "repo" | "shield" | "issue" | "pull" | "deploy";
}) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between gap-3">
        <VectorIcon name={icon} className="h-6 w-6" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-glow shadow-[0_0_16px_rgba(34,211,238,0.72)]" />
      </div>
      <p className="mt-5 font-mono text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 break-words text-cyan-50">{value}</p>
    </div>
  );
}
