"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VectorIcon } from "@/components/ui/VectorIcon";

const files = [
  "app/dashboard/page.tsx",
  "components/repo-panel.tsx",
  "lib/deploy-preview.ts",
  "types/repository.ts",
  "README.md"
];

const activity = [
  ["Nadia merged review queue", "main", "4m"],
  ["Owen opened pull request", "feature/insights", "11m"],
  ["Mira approved deploy preview", "release/blue-22", "18m"]
];

const issues = [
  ["GC-128", "Audit branch permission drift", "High"],
  ["GC-132", "Improve issue search ranking", "Medium"],
  ["GC-147", "Add preview health cards", "Low"]
];

export function DashboardPreview() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <SectionHeading
            eyebrow="Developer dashboard"
            title="A command center for code, teams, issues, and deployment state."
            description="The dashboard preview shows how repository navigation, file context, commit activity, issue pressure, pull request review, contributors, and deployment health work together."
            align="left"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="glass-panel overflow-hidden rounded-[2rem]"
          >
            <div className="grid min-h-[650px] lg:grid-cols-[210px_1fr_260px]">
              <aside className="border-b border-white/10 bg-white/[0.025] p-5 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-glow/20 bg-cyan-glow/10">
                    <VectorIcon name="repo" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Repositories</p>
                    <p className="font-mono text-[11px] text-muted">workspace</p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  {["orbital-ui", "mesh-api", "deploy-core", "docs-hub"].map((repo, index) => (
                    <div
                      key={repo}
                      className={`rounded-2xl px-3 py-2 text-sm transition ${
                        index === 0
                          ? "border border-cyan-glow/25 bg-cyan-glow/10 text-white"
                          : "text-muted hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {repo}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="font-mono text-[11px] uppercase text-muted">
                    File Explorer
                  </p>
                  <div className="mt-3 space-y-2">
                    {files.map((file) => (
                      <div
                        key={file}
                        className="truncate rounded-xl border border-white/10 bg-black/16 px-3 py-2 font-mono text-[11px] text-muted"
                      >
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="min-w-0 border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase text-cyan-glow">
                      Live code editor
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">deploy-preview.ts</h3>
                  </div>
                  <span className="rounded-full border border-mint/20 bg-mint/10 px-3 py-1 font-mono text-xs text-mint">
                    Synced
                  </span>
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-[#020711] p-4">
                  <div className="space-y-2 font-mono text-xs leading-6 sm:text-sm">
                    {[
                      ["01", "type PreviewStatus = 'queued' | 'building' | 'ready';"],
                      ["02", "export const preview = createPreview({"],
                      ["03", "  branch: 'feature/repo-insights',"],
                      ["04", "  checks: ['lint', 'tests', 'security'], "],
                      ["05", "  region: 'global-edge',"],
                      ["06", "});"]
                    ].map(([line, content]) => (
                      <div key={line} className="grid grid-cols-[2rem_1fr] gap-3">
                        <span className="select-none text-muted/60">{line}</span>
                        <span className="break-words text-cyan-50">{content}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Panel title="Commit Activity" icon="commit">
                    {activity.map(([label, branch, time]) => (
                      <div key={label} className="flex items-start gap-3 rounded-2xl bg-white/[0.035] p-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-glow shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
                        <div className="min-w-0">
                          <p className="truncate text-sm text-white">{label}</p>
                          <p className="font-mono text-[11px] text-muted">
                            {branch} · {time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Panel>

                  <Panel title="Issue Tracker" icon="issue">
                    {issues.map(([id, label, priority]) => (
                      <div key={id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-xs text-cyan-glow">{id}</span>
                          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-muted">
                            {priority}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-white">{label}</p>
                      </div>
                    ))}
                  </Panel>
                </div>
              </div>

              <aside className="p-5">
                <Panel title="Pull Request Panel" icon="pull">
                  <div className="rounded-2xl border border-mint/20 bg-mint/10 p-3">
                    <p className="text-sm font-semibold text-white">#248 Ready for review</p>
                    <p className="mt-1 text-xs text-muted">3 reviewers · 8 checks passed</p>
                  </div>
                  <div className="rounded-2xl border border-electric/20 bg-electric/10 p-3">
                    <p className="text-sm font-semibold text-white">#252 Preview building</p>
                    <p className="mt-1 text-xs text-muted">Branch preview queued</p>
                  </div>
                </Panel>

                <Panel title="Contributors" icon="team" className="mt-4">
                  {["MC", "OV", "NF", "AS"].map((initials, index) => (
                    <div key={initials} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-electric/40 to-cyan-glow/20 font-mono text-xs text-white">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-electric to-cyan-glow"
                            style={{ width: `${82 - index * 12}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Panel>

                <Panel title="Deployment Status" icon="deploy" className="mt-4">
                  {["Production", "Preview", "Staging"].map((label, index) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-white">{label}</p>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            index === 0 ? "bg-mint" : index === 1 ? "bg-cyan-glow" : "bg-electric-soft"
                          }`}
                        />
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-muted">
                        {index === 0 ? "live" : index === 1 ? "building" : "ready"}
                      </p>
                    </div>
                  ))}
                </Panel>
              </aside>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  title,
  icon,
  children,
  className
}: {
  title: string;
  icon: "commit" | "issue" | "pull" | "team" | "deploy";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.025] p-4 ${className ?? ""}`}>
      <div className="mb-4 flex items-center gap-2">
        <VectorIcon name={icon} className="h-5 w-5" />
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
