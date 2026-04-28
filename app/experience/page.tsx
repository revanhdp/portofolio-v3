"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

const experiences = [
  {
    id: 1,
    date: "2021 — PRESENT",
    role: "Design Director",
    company: "Studio Archive",
    tag: "Leadership",
    description:
      "Leading the visual design team, establishing global design systems, and overseeing high-profile digital campaigns for luxury sector clients. Managing a cross-functional team of 15 elite creatives and driving strict adherence to minimalist architectural principles.",
  },
  {
    id: 2,
    date: "2018 — 2021",
    role: "Senior UI Architect",
    company: "Acme Global",
    tag: "Architecture",
    description:
      "Spearheaded the complete visual redesign of the core enterprise product suite, improving user retention by 40% and winning three industry awards for interface clarity and accessibility. Developed the foundational token structure still in use today.",
  },
  {
    id: 3,
    date: "2015 — 2018",
    role: "Interaction Designer",
    company: "Creative Bureau",
    tag: "Motion",
    description:
      "Developed complex interactive prototypes and motion guidelines for emerging tech platforms. Collaborated closely with engineering teams to bridge the gap between high-fidelity concept art and production-ready code.",
  },
  {
    id: 4,
    date: "2013 — 2015",
    role: "Junior Product Designer",
    company: "Pixel & Co.",
    tag: "Product",
    description:
      "Designed end-to-end product experiences for mobile-first applications serving over 500K daily active users. Conducted user research, synthesized insights, and iterated rapidly on wireframes and high-fidelity prototypes.",
  },
];

/* ─────────────────────────────────────────────
   Single Card Component
───────────────────────────────────────────── */
function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0; // alternating side

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -60 : 60,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay: 0.1,
      },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "backOut", delay: 0.05 },
    },
  };

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } gap-0`}
    >
      {/* ── Card ── */}
      <motion.div
        className={`w-[calc(50%-2.5rem)] md:w-[calc(50%-3rem)] ${
          isLeft ? "mr-auto pr-8 md:pr-12" : "ml-auto pl-8 md:pl-12"
        }`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          className="group relative overflow-hidden bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 cursor-none"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{
            y: -6,
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.18)",
            borderColor: "rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Shine overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-white/60 via-transparent to-transparent pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Tag */}
          <motion.span
            className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border border-zinc-200 rounded-full px-3 py-1 mb-5"
            whileHover={{ scale: 1.05 }}
          >
            {exp.tag}
          </motion.span>

          {/* Date */}
          <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase mb-3">
            {exp.date}
          </p>

          {/* Role */}
          <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight mb-1">
            {exp.role}
          </h2>

          {/* Company */}
          <h3 className="text-base md:text-lg text-zinc-500 font-medium mb-5">
            {exp.company}
          </h3>

          {/* Divider */}
          <motion.div
            className="h-px bg-zinc-200 mb-5 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />

          {/* Description */}
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
            {exp.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-linear-to-r from-black via-zinc-600 to-transparent rounded-b-2xl"
            initial={{ width: 0 }}
            animate={{ width: hovered ? "80%" : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>

      {/* ── Center Node ── */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <motion.div
          className="relative flex items-center justify-center"
          // variants={nodeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute w-12 h-12 rounded-full border border-black/20"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {/* Pulsing glow */}
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-black/5"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Core dot */}
          <motion.div
            className="relative w-5 h-5 rounded-full bg-black border-2 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.15)]"
            whileInView={{
              boxShadow: [
                "0 0 0 2px rgba(0,0,0,0.15)",
                "0 0 16px 4px rgba(0,0,0,0.25)",
                "0 0 0 2px rgba(0,0,0,0.15)",
              ],
            }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
          {/* Index label */}
          <span className="absolute text-white text-[9px] font-bold select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Snake connector between cards
───────────────────────────────────────────── */
function SnakeConnector({ index }: { index: number }) {
  const goesRight = index % 2 === 0; // card was on left → snake curves right

  return (
    <div className="relative w-full h-24 md:h-28 flex items-center justify-center overflow-visible">
      {/* SVG curved snake path */}
      <svg
        viewBox="0 0 600 80"
        className="w-full h-full"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d={
            goesRight
              ? "M300 0 C300 0, 420 40, 300 80"
              : "M300 0 C300 0, 180 40, 300 80"
          }
          stroke="black"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Scroll Progress Sidebar
───────────────────────────────────────────── */
function ScrollProgressBar({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [pct, setPct] = React.useState(0);
  React.useEffect(
    () => progressPercent.on("change", (v) => setPct(Math.round(v))),
    [progressPercent]
  );

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none">
      {/* Track */}
      <div className="w-px h-32 md:h-48 bg-zinc-200 relative overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-full bg-black origin-top rounded-full"
          style={{ scaleY }}
        />
      </div>
      {/* Label */}
      <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase writing-mode-vertical">
        {pct}%
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="flex flex-col w-full max-w-4xl mx-auto pt-16 pb-48">
      <ScrollProgressBar scrollYProgress={scrollYProgress} />

      {/* ── Header ── */}
      <div className="mb-20 md:mb-28 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-400 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Career Journey
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black uppercase mb-6 leading-none">
            Experience
          </h1>
          <motion.div
            className="h-px w-16 bg-black mb-6"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />
          <p className="text-zinc-500 text-lg md:text-xl max-w-xl leading-relaxed">
            A continuous trajectory of design excellence, system architecture,
            and creative leadership across leading international studios.
          </p>
        </motion.div>
      </div>

      {/* ── Snake Timeline ── */}
      <div className="relative w-full px-4 md:px-8 flex flex-col">
        {/* Vertical center spine (decorative) */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-zinc-100 pointer-events-none" />

        {experiences.map((exp, i) => (
          <React.Fragment key={exp.id}>
            <ExperienceCard exp={exp} index={i} />
            {/* Snake connector between cards, except after the last */}
            {i < experiences.length - 1 && <SnakeConnector index={i} />}
          </React.Fragment>
        ))}

        {/* End cap */}
        <motion.div
          className="relative flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          <div className="w-3 h-3 rounded-full bg-zinc-300 border-2 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.1)]" />
        </motion.div>
      </div>
    </div>
  );
}
