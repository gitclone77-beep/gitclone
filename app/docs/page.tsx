import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { VectorIcon } from "@/components/ui/VectorIcon";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "GitClone documentation for repositories, issues, pull requests, deployment previews, API usage, authentication, and production setup."
};

const sidebarSections = [
  {
    title: "Use GitClone",
    links: [
      ["Get started", "#get-started"],
      ["Repository workflow", "#repository-workflow"],
      ["Issues and pull requests", "#issues-pull-requests"],
      ["Deploy previews", "#deploy-previews"]
    ]
  },
  {
    title: "Develop",
    links: [
      ["API reference", "#api-reference"],
      ["Authentication", "#authentication"],
      ["Environment variables", "#environment-variables"]
    ]
  },
  {
    title: "Operate",
    links: [
      ["Production checklist", "#production-checklist"]
    ]
  }
] as const;

const quickActions = [
  {
    title: "Create repository",
    description:
      "Register a project with owner, visibility, language, default branch, and storage metadata.",
    icon: "repo" as const
  },
  {
    title: "Open review lane",
    description:
      "Track pull request status, reviewers, branch names, check totals, and merge readiness.",
    icon: "pull" as const
  },
  {
    title: "Ship preview",
    description:
      "Attach deployments to repositories with environment, branch, commit SHA, and URL state.",
    icon: "deploy" as const
  }
];

const apiRows = [
  ["GET", "/health", "Runtime status and environment signal."],
  ["GET", "/api/stats", "Repository, issue, pull request, deployment, and storage totals."],
  ["GET", "/api/repositories", "Repository records used by the dashboard."],
  ["POST", "/api/repositories", "Create a repository and seed its default branch."],
  ["GET", "/api/repositories/:id", "Repository detail with branches, issues, pull requests, and deployments."],
  ["POST", "/api/issues", "Create an issue for an existing repository."],
  ["POST", "/api/pull-requests", "Create a pull request review record."],
  ["POST", "/api/deployments", "Create a deployment preview record."]
] as const;

const envRows = [
  ["NEXT_PUBLIC_SITE_URL", "Frontend canonical URL used by metadata."],
  ["NEXT_PUBLIC_API_BASE_URL", "Browser-visible API service URL."],
  ["GITCLONE_API_BASE_URL", "Server-side API override for Next.js dashboard rendering."],
  ["FRONTEND_ORIGIN", "Comma-separated origins allowed by API CORS."],
  ["DATABASE_FILE", "JSON database file path for the API runtime."],
  ["API_KEY", "Optional write-protection key for POST and PATCH routes."]
] as const;

const checklist = [
  "API health endpoint returns status ok.",
  "Dashboard can read repository and stats data from the production API URL.",
  "CORS includes the production application domain.",
  "Production environment variables point to the API service URL.",
  "Systemd service restarts automatically after reboot.",
  "Production page has no broken navigation links."
];

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <section className="border-b border-white/10 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-[#f97316]">
                GitClone Docs
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
                Repository platform documentation for builders and operators.
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted sm:text-lg">
                Use this guide to run GitClone locally, connect the dashboard to the API,
                publish the API service, and ship the production interface.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex min-h-12 items-center gap-3 rounded-xl border border-cyan-glow/20 bg-black/30 px-4">
                <span className="font-mono text-xs text-muted">Search documentation</span>
                <span className="ml-auto rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-cyan-glow">
                  Ctrl K
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center font-mono text-[11px] uppercase text-muted">
                <span className="rounded-xl border border-white/10 bg-white/[0.035] px-2 py-2">API</span>
                <span className="rounded-xl border border-white/10 bg-white/[0.035] px-2 py-2">Auth</span>
                <span className="rounded-xl border border-white/10 bg-white/[0.035] px-2 py-2">Deploy</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-8 xl:grid-cols-[17rem_minmax(0,1fr)_14rem]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-6 border-r border-white/10 pr-5">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <p className="font-mono text-xs font-semibold uppercase text-white">
                    {section.title}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {section.links.map(([label, href]) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-cyan-glow"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <article className="min-w-0 space-y-14">
            <section id="get-started" className="scroll-mt-28">
              <SectionLabel label="Get started" />
              <h2 className="mt-3 text-3xl font-semibold text-white">Run the full stack</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                GitClone uses a Next.js interface and a separate Fastify API service. Start both
                processes locally when you need the dashboard to read and write repository records.
              </p>
              <CodeBlock
                code={`npm install
npm run api:install
npm run api:build
npm run api:start

# In another terminal
npm run dev`}
              />
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {quickActions.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <VectorIcon name={item.icon} className="h-7 w-7" />
                    <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="repository-workflow" className="scroll-mt-28">
              <SectionLabel label="Repository workflow" />
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Model repositories like an operations surface
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Repository records carry owner, slug, category, language, visibility, default branch,
                storage, stars, forks, and timestamps. The dashboard reads the same shape from
                <InlineCode>/api/repositories</InlineCode> and renders it without mock-only state.
              </p>
              <div className="mt-5 rounded-2xl border border-cyan-glow/20 bg-cyan-glow/[0.06] p-5">
                <p className="font-mono text-xs uppercase text-cyan-glow">Recommended flow</p>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-muted">
                  <li>1. Create a repository from the dashboard or API.</li>
                  <li>2. Attach issues, pull requests, and deployments to that repository ID.</li>
                  <li>3. Use stats and health checks to verify the production API service.</li>
                </ol>
              </div>
            </section>

            <section id="issues-pull-requests" className="scroll-mt-28">
              <SectionLabel label="Issues and pull requests" />
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Keep planning and review data connected
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <InfoPanel
                  title="Issues"
                  body="Issues store title, status, priority, assignee, repository ID, and timestamps. Status updates use a dedicated PATCH endpoint."
                />
                <InfoPanel
                  title="Pull requests"
                  body="Pull requests store source and target branches, reviewers, check totals, review state, and merge readiness."
                />
              </div>
            </section>

            <section id="deploy-previews" className="scroll-mt-28">
              <SectionLabel label="Deploy previews" />
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Track deployments from branch to URL
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Deployment records connect a repository to an environment, branch, preview URL,
                commit SHA, status, and timestamps. Use them to make the dashboard show real release
                state instead of static marketing copy.
              </p>
            </section>

            <section id="api-reference" className="scroll-mt-28">
              <SectionLabel label="API reference" />
              <h2 className="mt-3 text-3xl font-semibold text-white">API endpoints</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-[5rem_minmax(9rem,1fr)_1.2fr] border-b border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-xs uppercase text-muted">
                  <span>Method</span>
                  <span>Path</span>
                  <span>Purpose</span>
                </div>
                {apiRows.map(([method, path, purpose]) => (
                  <div
                    key={`${method}-${path}`}
                    className="grid grid-cols-[5rem_minmax(9rem,1fr)_1.2fr] gap-3 border-b border-white/10 px-4 py-3 text-sm last:border-b-0"
                  >
                    <span className="font-mono text-[#f97316]">{method}</span>
                    <span className="break-all font-mono text-cyan-glow">{path}</span>
                    <span className="text-muted">{purpose}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="authentication" className="scroll-mt-28">
              <SectionLabel label="Authentication" />
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Protect write operations with an API key
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                If <InlineCode>API_KEY</InlineCode> is configured, every POST and PATCH route must
                send the same value through <InlineCode>x-api-key</InlineCode>. Read endpoints remain
                public for dashboard rendering and health checks.
              </p>
              <CodeBlock
                code={`curl -X POST "$GITCLONE_API_BASE_URL/api/repositories" \\
  -H "content-type: application/json" \\
  -H "x-api-key: $API_KEY" \\
  -d '{"name":"portal","owner":"gitclone-labs","description":"Customer portal","category":"SaaS","language":"TypeScript","visibility":"private"}'`}
              />
            </section>

            <section id="environment-variables" className="scroll-mt-28">
              <SectionLabel label="Environment variables" />
              <h2 className="mt-3 text-3xl font-semibold text-white">Production configuration</h2>
              <div className="mt-5 grid gap-3">
                {envRows.map(([name, description]) => (
                  <div
                    key={name}
                    className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-[15rem_1fr]"
                  >
                    <span className="break-all font-mono text-sm text-cyan-glow">{name}</span>
                    <span className="text-sm leading-6 text-muted">{description}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="production-checklist" className="scroll-mt-28">
              <SectionLabel label="Production checklist" />
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Verify the release end to end
              </h2>
              <div className="mt-5 grid gap-3">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-mint shadow-[0_0_18px_rgba(94,234,212,0.65)]" />
                    <p className="text-sm leading-6 text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-28 border-l border-white/10 pl-5">
              <p className="font-mono text-xs font-semibold uppercase text-white">On this page</p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                {sidebarSections.flatMap((section) =>
                  section.links.map(([label, href]) => (
                    <Link key={href} href={href} className="block transition hover:text-cyan-glow">
                      {label}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionLabel({ label }: { label: string }) {
  return <p className="font-mono text-xs font-semibold uppercase text-cyan-glow">{label}</p>;
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="mx-1 break-words rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-cyan-50">
      {children}
    </code>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-[#030712] p-4 text-sm leading-6 text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <code>{code}</code>
    </pre>
  );
}

function InfoPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
