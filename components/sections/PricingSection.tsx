"use client";

import { motion } from "framer-motion";
import { pricingPlans } from "@/lib/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VectorIcon } from "@/components/ui/VectorIcon";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans for solo builders, teams, and engineering organizations."
          description="Every tier includes modern repository hosting foundations, responsive collaboration tools, and a clean path to GitClone Cloud deployment workflows."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {pricingPlans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -10, scale: 1.014 }}
              className={cn(
                "relative overflow-hidden rounded-3xl border p-6 transition",
                plan.featured
                  ? "border-cyan-glow/50 bg-gradient-to-b from-cyan-glow/20 via-electric/10 to-white/[0.035] shadow-[0_0_70px_rgba(34,211,238,0.22)]"
                  : "glass-panel"
              )}
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-glow/20 bg-white/5">
                  <VectorIcon name={plan.featured ? "spark" : "repo"} className="h-6 w-6" />
                </div>
                {plan.featured ? (
                  <div className="max-w-28 rounded-full border border-cyan-glow/30 bg-cyan-glow/15 px-3 py-1 text-center font-mono text-[11px] uppercase leading-4 text-cyan-glow">
                    Most picked
                  </div>
                ) : null}
              </div>
              <h3 className="mt-7 text-xl font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-semibold text-white">
                  {plan.price}
                </span>
                {plan.price !== "Custom" ? (
                  <span className="pb-1 text-sm text-muted">/ month</span>
                ) : null}
              </div>
              <p className="mt-4 min-h-16 text-sm leading-6 text-muted">{plan.description}</p>
              <ButtonLink
                href={plan.name === "Enterprise" ? "/docs" : "/register"}
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Start Building"}
              </ButtonLink>
              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-glow shadow-[0_0_12px_rgba(34,211,238,0.75)]" />
                    <span className="min-w-0 break-words">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
