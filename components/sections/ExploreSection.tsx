"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { categories, collections, developers, repositories } from "@/lib/content";
import { RepositoryCard } from "@/components/ui/RepositoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VectorIcon } from "@/components/ui/VectorIcon";
import { cn } from "@/lib/utils";

export function ExploreSection() {
  const filters = ["All", ...categories];
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleRepositories =
    activeCategory === "All"
      ? repositories.slice(0, 4)
      : repositories.filter((repository) => repository.category === activeCategory);

  return (
    <section id="explore" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-electric/15 blur-[120px]" />
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-cyan-glow/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Explore repositories"
          title="Find the projects, builders, and collections moving fastest."
          description="GitClone discovery blends trending repositories, popular developers, open source collections, and category filters into one premium exploration surface."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((category, index) => (
            <motion.button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs uppercase transition hover:border-cyan-glow/70 hover:bg-cyan-glow/10 hover:text-white",
                activeCategory === category
                  ? "border-cyan-glow/70 bg-cyan-glow/15 text-white shadow-[0_0_24px_rgba(34,211,238,0.16)]"
                  : "border-cyan-glow/20 bg-white/[0.035] text-muted"
              )}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.7fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {visibleRepositories.map((repository, index) => (
              <RepositoryCard key={repository.name} repository={repository} index={index} />
            ))}
          </div>

          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="glass-panel rounded-3xl p-6"
            >
              <div className="flex items-center gap-3">
                <VectorIcon name="team" className="h-7 w-7" />
                <h3 className="text-xl font-semibold text-white">Popular developers</h3>
              </div>
              <div className="mt-6 space-y-4">
                {developers.map((developer) => (
                  <div
                    key={developer.name}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-glow/20 bg-gradient-to-br from-electric/35 to-cyan-glow/20 font-mono text-sm text-white">
                        {developer.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{developer.name}</p>
                        <p className="truncate text-xs text-muted">{developer.role}</p>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <p className="text-sm text-white">{developer.repos}</p>
                      <p className="text-[11px] text-muted">repos</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.08 }}
              className="glass-panel rounded-3xl p-6"
            >
              <div className="flex items-center gap-3">
                <VectorIcon name="spark" className="h-7 w-7" />
                <h3 className="text-xl font-semibold text-white">Open source collections</h3>
              </div>
              <div className="mt-6 grid gap-3">
                {collections.map((collection, index) => (
                  <div
                    key={collection}
                    className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-cyan-glow/10 p-4"
                  >
                    <p className="font-medium text-white">{collection}</p>
                    <p className="mt-2 font-mono text-xs text-cyan-glow">
                      {24 + index * 7} curated repos
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
