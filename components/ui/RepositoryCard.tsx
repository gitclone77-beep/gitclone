"use client";

import { motion } from "framer-motion";
import { VectorIcon } from "@/components/ui/VectorIcon";
import { cn } from "@/lib/utils";
import type { Repository } from "@/types/site";

const accentMap = {
  cyan: "from-cyan-glow/25 to-cyan-glow/5 border-cyan-glow/30",
  mint: "from-mint/22 to-mint/5 border-mint/30",
  blue: "from-electric/25 to-electric/5 border-electric/30",
  rose: "from-rose-signal/22 to-rose-signal/5 border-rose-signal/30"
};

export function RepositoryCard({
  repository,
  index
}: {
  repository: Repository;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.015 }}
      className={cn(
        "glass-panel rounded-3xl border bg-gradient-to-br p-5",
        accentMap[repository.accent as keyof typeof accentMap]
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-glow/20 bg-white/5">
            <VectorIcon name="repo" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{repository.name}</h3>
            <p className="text-xs uppercase text-cyan-glow">
              {repository.category}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted">
          {repository.language}
        </span>
      </div>
      <p className="mt-5 min-h-14 text-sm leading-6 text-muted">{repository.description}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-sm">
        <div className="rounded-2xl border border-white/10 bg-black/16 px-3 py-2">
          <span className="block text-xs text-muted">Stars</span>
          <span className="text-white">{repository.stars}</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/16 px-3 py-2">
          <span className="block text-xs text-muted">Forks</span>
          <span className="text-white">{repository.forks}</span>
        </div>
      </div>
    </motion.article>
  );
}
