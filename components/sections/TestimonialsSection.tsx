"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Developer proof"
          title="Trusted by teams building ambitious software systems."
          description="Engineering teams get a sharper view of repository health, review flow, branch previews, and deployment readiness."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="glass-panel rounded-3xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-glow/20 bg-gradient-to-br from-electric/40 via-cyan-glow/20 to-mint/15 font-mono text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.18)]">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                  <p className="font-mono text-[11px] uppercase text-cyan-glow">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-pretty text-base leading-7 text-cyan-50">
                “{testimonial.quote}”
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 font-mono text-sm text-cyan-glow">
                {testimonial.stats}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
