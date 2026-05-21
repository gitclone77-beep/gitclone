"use client";

import { motion } from "framer-motion";

const particles = [
  { x: "7%", y: "12%", s: 3, d: 0 },
  { x: "18%", y: "38%", s: 2, d: 0.6 },
  { x: "31%", y: "18%", s: 4, d: 1.1 },
  { x: "46%", y: "10%", s: 2, d: 0.3 },
  { x: "62%", y: "28%", s: 3, d: 1.4 },
  { x: "74%", y: "14%", s: 2, d: 0.8 },
  { x: "86%", y: "36%", s: 3, d: 1.7 },
  { x: "92%", y: "8%", s: 2, d: 0.5 },
  { x: "12%", y: "72%", s: 3, d: 1.9 },
  { x: "39%", y: "78%", s: 2, d: 1.2 },
  { x: "68%", y: "82%", s: 4, d: 0.2 },
  { x: "83%", y: "70%", s: 2, d: 1.6 }
];

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="fine-grid absolute inset-0 opacity-60" />
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.x}-${particle.y}`}
          className="absolute rounded-full bg-cyan-glow shadow-[0_0_22px_rgba(34,211,238,0.78)]"
          style={{
            left: particle.x,
            top: particle.y,
            height: particle.s,
            width: particle.s
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            y: [0, -18, 0],
            scale: [1, 1.6, 1]
          }}
          transition={{
            duration: 4.8 + index * 0.18,
            delay: particle.d,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
