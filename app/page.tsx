"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Subtle animated grain / noise background
───────────────────────────────────────────── */
function GrainBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Breathing center glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(0,0,0,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 75% 60% at 52% 46%, rgba(0,0,0,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse 70% 55% at 48% 50%, rgba(0,0,0,0.04) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Thin horizontal rule at golden section */}
      <div className="absolute left-[5%] right-[5%] top-[38%] h-px bg-black/5" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   L-corner accents (animated draw)
───────────────────────────────────────────── */
function CornerAccents() {
  const def = [
    { pos: "top-0 left-0",     border: "border-t border-l" },
    { pos: "top-0 right-0",    border: "border-t border-r" },
    { pos: "bottom-0 left-0",  border: "border-b border-l" },
    { pos: "bottom-0 right-0", border: "border-b border-r" },
  ];
  return (
    <>
      {def.map((c, i) => (
        <motion.span
          key={i}
          className={`absolute ${c.pos} w-10 h-10 ${c.border} border-black`}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 40, height: 40, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   Mouse parallax wrapper for hero content
───────────────────────────────────────────── */
function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 50, damping: 18 });
  const y = useSpring(useTransform(my, [-1, 1], [-6,  6]),  { stiffness: 50, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2));
      my.set((e.clientY - (r.top  + r.height / 2)) / (r.height / 2));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <motion.div style={{ x, y }} className="flex flex-col items-center">
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <GrainBackground />
      <CornerAccents />

      {/* ── Hero ── */}
      <HeroParallax>
        {/* Status pill */}
        <motion.div
          className="flex items-center gap-2 mb-8 px-4 py-1.5 border border-black/15 text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-black"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Available for work
        </motion.div>

        {/* Role pre-label */}
        <motion.p
          className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-black/40 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Fullstack Developer &amp; Designer
        </motion.p>

        {/* Name — dominant typographic hero */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-black leading-none mb-3 select-none"
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Revan.
        </motion.h1>

        {/* Full name — spaced, muted */}
        <motion.p
          className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-black/35 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          Revanza Hadi Putra
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-sm md:text-base text-black/55 leading-relaxed max-w-sm text-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          Building thoughtful digital experiences —<br />
          from system{" "}
          <span className="text-black font-semibold">architecture</span> to
          pixel-perfect{" "}
          <span className="text-black font-semibold">interfaces</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <motion.a
            href="/projects"
            className="px-7 py-2.5 text-sm font-semibold bg-black text-white tracking-wide cursor-none"
            whileHover={{ scale: 1.04, opacity: 0.85 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="/contact"
            className="px-7 py-2.5 text-sm font-semibold border border-black text-black tracking-wide cursor-none"
            whileHover={{ scale: 1.04, backgroundColor: "#000", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </HeroParallax>

      {/* ── Decorative thin horizontal lines ── */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-black/8 pointer-events-none"
        style={{ top: "18%" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bg-black/8 pointer-events-none"
        style={{ bottom: "22%" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
      />

      {/* ── Bottom-left meta ── */}
      <motion.div
        className="absolute bottom-8 left-[4%] hidden md:flex flex-col gap-1 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-black/30 font-semibold">
          Based in
        </span>
        <span className="text-xs font-bold text-black/50 tracking-wide">
          Indonesia
        </span>
      </motion.div>

      {/* ── Bottom-right meta ── */}
      <motion.div
        className="absolute bottom-8 right-[4%] hidden md:flex flex-col gap-1 items-end pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-black/30 font-semibold">
          Experience
        </span>
        <span className="text-xs font-bold text-black/50 tracking-wide">
          3+ Years
        </span>
      </motion.div>
    </div>
  );
}
