'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function HeroMotif() {
  const shouldReduceMotion = useReducedMotion();

  // Animation configuration: restrained single resolve on mount, disabled if reduced motion
  const drawTransition = (delay = 0, duration = 0.8) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration, delay, ease: [0.16, 1, 0.3, 1] };

  const fadeTransition = (delay = 0) =>
    shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay };

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[440px] aspect-[440/280] rounded-xl border border-white/5 bg-zinc-950/40 p-4 sm:p-6 select-none relative overflow-hidden backdrop-blur-sm"
    >
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        {/* Stage Columns & Column Labels */}
        <g className="font-mono text-[9px] tracking-wider fill-zinc-500">
          <text x="24" y="22">01 // OBSERVE</text>
          <text x="160" y="22">02 // STRUCTURE</text>
          <text x="296" y="22" className="fill-emerald-400/90 font-medium">03 // VERIFY</text>
        </g>

        {/* Subtle Horizontal Reference Baselines */}
        <line x1="20" y1="36" x2="380" y2="36" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="20" y1="210" x2="380" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Observation Data Points (Discrete Marks) */}
        <g>
          {/* Node 1 */}
          <motion.circle
            cx="48"
            cy="70"
            r="2.5"
            className="fill-zinc-400"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={fadeTransition(0.1)}
          />
          <line x1="43" y1="70" x2="53" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Node 2 */}
          <motion.circle
            cx="72"
            cy="120"
            r="2.5"
            className="fill-zinc-400"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={fadeTransition(0.2)}
          />
          <line x1="67" y1="120" x2="77" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Node 3 */}
          <motion.circle
            cx="44"
            cy="172"
            r="2.5"
            className="fill-zinc-400"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={fadeTransition(0.3)}
          />
          <line x1="39" y1="172" x2="49" y2="172" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </g>

        {/* Structural Transformation & Flow Paths */}
        <g>
          {/* Path 1: (48,70) -> (170, 95) -> (310, 85) */}
          <motion.path
            d="M 48 70 C 110 70, 120 95, 180 95"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.25"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(0.3, 0.7)}
          />
          <motion.path
            d="M 180 95 C 230 95, 260 85, 310 85"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.25"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(0.6, 0.7)}
          />

          {/* Path 2: (72, 120) -> (180, 120) -> (310, 135) */}
          <motion.path
            d="M 72 120 L 180 120"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.25"
            strokeDasharray="3 3"
            fill="none"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fadeTransition(0.4)}
          />
          <motion.path
            d="M 180 120 C 230 120, 260 135, 310 135"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.25"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(0.7, 0.7)}
          />

          {/* Path 3: (44, 172) -> (180, 145) -> (310, 135) */}
          <motion.path
            d="M 44 172 C 110 172, 120 145, 180 145"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.25"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(0.5, 0.7)}
          />
          <motion.path
            d="M 180 145 C 230 145, 260 135, 310 135"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.25"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(0.8, 0.7)}
          />
        </g>

        {/* Intermediate Structural Topology Node Matrix */}
        <g>
          <motion.rect
            x="174"
            y="89"
            width="12"
            height="12"
            rx="2"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            fill="#090a0c"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fadeTransition(0.5)}
          />
          <circle cx="180" cy="95" r="1.5" className="fill-zinc-400" />

          <motion.rect
            x="174"
            y="114"
            width="12"
            height="12"
            rx="2"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            fill="#090a0c"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fadeTransition(0.55)}
          />
          <circle cx="180" cy="120" r="1.5" className="fill-zinc-400" />

          <motion.rect
            x="174"
            y="139"
            width="12"
            height="12"
            rx="2"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            fill="#090a0c"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fadeTransition(0.6)}
          />
          <circle cx="180" cy="145" r="1.5" className="fill-zinc-400" />
        </g>

        {/* Verification Result Nodes (Evaluated / Resolved State) */}
        <g>
          {/* Resolved Checkpoint Alpha */}
          <motion.g
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={drawTransition(0.9, 0.4)}
          >
            <circle cx="310" cy="85" r="9" stroke="#10b981" strokeWidth="1.5" fill="#090a0c" />
            <path d="M 306 85.5 L 309 88.5 L 314 82.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </motion.g>

          {/* Resolved Checkpoint Beta */}
          <motion.g
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={drawTransition(1.0, 0.4)}
          >
            <circle cx="310" cy="135" r="9" stroke="#10b981" strokeWidth="1.5" fill="#090a0c" />
            <path d="M 306 135.5 L 309 138.5 L 314 132.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
