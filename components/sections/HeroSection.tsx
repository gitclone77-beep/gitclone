"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ParticleField } from "@/components/ui/ParticleField";
import { VectorIcon } from "@/components/ui/VectorIcon";

const codeLines = [
  "export async function deployPreview(branch) {",
  "  const checks = await gitclone.verify(branch);",
  "  return checks.ready ? ship(branch) : queueReview();",
  "}"
];

const commitEvents = [
  { label: "feat: branch previews", time: "2m ago", tone: "cyan" },
  { label: "fix: auth policy map", time: "12m ago", tone: "blue" },
  { label: "docs: release notes", time: "28m ago", tone: "mint" }
];

const analyticsCards = [
  { label: "Analytics", value: "+24%", icon: "analytics" as const },
  { label: "Pull Requests", value: "18", icon: "pull" as const },
  { label: "Issues", value: "42", icon: "issue" as const }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 sm:px-6 lg:px-8">
      <ParticleField />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-glow/15 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-glow/25 bg-cyan-glow/10 px-4 py-2 text-sm text-cyan-glow shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_18px_rgba(94,234,212,0.9)]" />
            Repository intelligence for modern teams
          </div>
          <h1 className="glow-text mt-7 text-balance text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
            Build, Clone, Ship — Faster with GitClone
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
            A next-generation developer platform for repositories, collaboration,
            issue tracking, branch previews, and deployment workflows.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/dashboard" className="sm:min-w-44">
              Create Repository
            </ButtonLink>
            <ButtonLink href="#explore" variant="secondary" className="sm:min-w-44">
              Explore Projects
            </ButtonLink>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["99.99%", "Preview uptime"],
              ["4.2M", "Commits traced"],
              ["18 ms", "Search latency"]
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <p className="font-mono text-xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 34 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <RepositoryHeroMockup />
        </motion.div>
      </div>
    </section>
  );
}

function RepositoryHeroMockup() {
  return (
    <div className="glass-panel scanline relative rounded-[2rem] p-3 glow-pulse">
      <div className="absolute left-0 top-16 h-24 w-24 rounded-full bg-electric/20 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-32 w-32 rounded-full bg-cyan-glow/20 blur-3xl" />
      <div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#040b15]/94">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-symbol.png"
              alt=""
              width={34}
              height={34}
              className="drop-shadow-[0_0_14px_rgba(34,211,238,0.45)]"
            />
            <div>
              <p className="font-mono text-xs uppercase text-cyan-glow">
                GitClone Cloud
              </p>
              <p className="text-sm font-semibold text-white">orbital-ui / main</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {["Build", "Tests", "Preview"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-mint/20 bg-mint/10 px-3 py-1 font-mono text-[11px] text-mint"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
          <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
            <div className="grid grid-cols-3 gap-3">
              {analyticsCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-3"
                >
                  <VectorIcon name={card.icon} className="h-5 w-5" />
                  <p className="mt-4 font-mono text-lg font-semibold text-white">{card.value}</p>
                  <p className="text-[11px] text-muted">{card.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Code Preview</p>
                <span className="font-mono text-[11px] text-cyan-glow">deploy.ts</span>
              </div>
              <div className="space-y-2 font-mono text-xs sm:text-sm">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.12 }}
                    className="grid grid-cols-[2rem_1fr] gap-3 rounded-lg bg-white/[0.025] px-3 py-2"
                  >
                    <span className="text-muted/70">{index + 1}</span>
                    <span className="break-words text-cyan-50">{line}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Commit Timeline</p>
                <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_18px_rgba(94,234,212,0.9)]" />
              </div>
              <div className="mt-5 space-y-4">
                {commitEvents.map((event) => (
                  <div key={event.label} className="flex gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-cyan-glow shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{event.label}</p>
                      <p className="font-mono text-[11px] text-muted">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-electric/20 bg-electric/10 p-4">
              <div className="flex items-center gap-3">
                <VectorIcon name="deploy" className="h-7 w-7" />
                <div>
                  <p className="text-sm font-semibold text-white">Production preview</p>
                  <p className="font-mono text-xs text-cyan-glow">gitclone.app/p/orbital-ui</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-electric to-cyan-glow"
                  initial={{ width: "0%" }}
                  animate={{ width: "86%" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
