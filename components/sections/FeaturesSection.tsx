"use client";

import { motion } from "framer-motion";
import { featureCards } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VectorIcon } from "@/components/ui/VectorIcon";

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Platform capabilities"
          title="Everything a modern repository workflow needs."
          description="GitClone combines source control, operational previews, collaboration intelligence, and governance into a polished developer command layer."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              whileHover={{ y: -8, scale: 1.012 }}
              className="glass-panel group relative overflow-hidden rounded-3xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/15 via-transparent to-electric/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-glow/25 bg-cyan-glow/10 shadow-[0_0_32px_rgba(34,211,238,0.14)]">
                    <VectorIcon name={feature.icon} className="h-7 w-7" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 font-mono text-[11px] uppercase text-cyan-glow">
                    {feature.signal}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
