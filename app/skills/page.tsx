"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import React, { useRef } from "react";

/* ─────────────────────────────────────────────
   Data — grouped by category
───────────────────────────────────────────── */
const categories = [
  {
    id: 1,
    label: "Frontend",
    skills: [
      { name: "React",      level: "Advanced",      tag: "UI Library"     },
      { name: "Next.js",    level: "Advanced",      tag: "Full-stack FW"  },
      { name: "TypeScript", level: "Advanced",      tag: "Type Safety"    },
      { name: "Tailwind",   level: "Advanced",      tag: "Styling"        },
    ],
  },
  {
    id: 2,
    label: "Backend",
    skills: [
      { name: "Node.js",    level: "Intermediate",  tag: "Runtime"        },
      { name: "Express",    level: "Intermediate",  tag: "HTTP Server"    },
      { name: "REST APIs",  level: "Advanced",      tag: "Architecture"   },
      { name: "GraphQL",    level: "Intermediate",  tag: "Query Layer"    },
    ],
  },
  {
    id: 3,
    label: "Database",
    skills: [
      { name: "PostgreSQL", level: "Intermediate",  tag: "Relational DB"  },
      { name: "Prisma",     level: "Intermediate",  tag: "ORM"            },
      { name: "Redis",      level: "Beginner",      tag: "Cache / Queue"  },
      { name: "Supabase",   level: "Intermediate",  tag: "BaaS"           },
    ],
  },
  {
    id: 4,
    label: "Tooling & Design",
    skills: [
      { name: "Figma",      level: "Intermediate",  tag: "UI / UX Design" },
      { name: "Git",        level: "Advanced",      tag: "Version Control" },
      { name: "Docker",     level: "Beginner",      tag: "Containers"     },
      { name: "Linux",      level: "Intermediate",  tag: "OS / DevOps"    },
    ],
  },
];

/* ─────────────────────────────────────────────
   Scroll Progress Sidebar
───────────────────────────────────────────── */
function ScrollProgress({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });
  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none">
      <div className="w-px h-36 md:h-52 bg-black/10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-black origin-top"
          style={{ scaleY }}
        />
      </div>
      <span className="text-[9px] font-bold tracking-widest text-black/30 uppercase">scroll</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Snake connector SVG between category blocks
───────────────────────────────────────────── */
function SnakeConnector({ index }: { index: number }) {
  const curvesRight = index % 2 === 0;
  return (
    <div className="relative w-full h-20 md:h-24 flex items-center justify-center overflow-visible">
      <svg viewBox="0 0 600 70" className="w-full h-full" preserveAspectRatio="none" fill="none">
        <motion.path
          d={curvesRight
            ? "M300 0 C300 0, 430 35, 300 70"
            : "M300 0 C300 0, 170 35, 300 70"}
          stroke="black"
          strokeWidth="1"
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.25 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Center Node
───────────────────────────────────────────── */
function CenterNode({ index }: { index: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-10">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Pulsing outer ring */}
        <motion.div
          className="absolute w-11 h-11 rounded-full border border-black/20"
          animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Core */}
        <div className="w-6 h-6 rounded-full bg-black border-[3px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] flex items-center justify-center">
          <span className="text-white text-[8px] font-black select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Skill pill — inside each category card
───────────────────────────────────────────── */
function SkillPill({ name, level, tag }: { name: string; level: string; tag: string }) {
  return (
    <motion.div
      className="group relative flex items-center justify-between gap-4 border border-black/10 px-4 py-3 overflow-hidden cursor-none"
      whileHover={{
        borderColor: "rgba(0,0,0,0.6)",
        backgroundColor: "#000",
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* Hover fill effect */}
      <motion.div
        className="absolute inset-0 bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out pointer-events-none"
        style={{ transformOrigin: "left" }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <span className="text-sm font-bold text-black group-hover:text-white transition-colors duration-200">
          {name}
        </span>
        <span className="text-[9px] font-semibold tracking-[0.15em] uppercase text-black/35 group-hover:text-white/50 transition-colors duration-200">
          {tag}
        </span>
      </div>

      <span className="relative z-10 text-[10px] font-bold tracking-wide uppercase text-black/30 group-hover:text-white/50 transition-colors duration-200">
        {level}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Category Card (left or right)
───────────────────────────────────────────── */
function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative w-full flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-start`}>
      {/* Card */}
      <motion.div
        className={`w-[calc(50%-2.5rem)] md:w-[calc(50%-3.5rem)] ${isLeft ? "mr-auto pr-6 md:pr-10" : "ml-auto pl-6 md:pl-10"}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
      >
        {/* Category header */}
        <div className={`mb-5 ${isLeft ? "text-left" : "text-right"}`}>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/35 mb-2 block">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
            {cat.label}
          </h2>
          {/* Draw-in underline */}
          <motion.div
            className={`h-px bg-black mt-3 ${isLeft ? "origin-left" : "origin-right"}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Skill pills */}
        <div className="flex flex-col gap-2">
          {cat.skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: "easeOut" }}
            >
              <SkillPill {...s} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Center node */}
      <CenterNode index={index} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="flex flex-col w-full max-w-4xl mx-auto pt-16 pb-48">
      <ScrollProgress scrollYProgress={scrollYProgress} />

      {/* ── Header ── */}
      <div className="mb-20 md:mb-28 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase text-black/35 mb-5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Technical Proficiency
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black uppercase mb-5 leading-none">
            Skills
          </h1>

          <motion.div
            className="h-px bg-black mb-6 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            style={{ width: 56 }}
          />

          <p className="text-black/50 text-base md:text-lg max-w-md leading-relaxed">
            A curated stack of technologies I rely on daily — from interface
            design through to deployment.
          </p>
        </motion.div>
      </div>

      {/* ── Snake Timeline ── */}
      <div className="relative w-full px-4 md:px-8 flex flex-col">
        {/* Vertical spine */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-black/6 pointer-events-none" />

        {categories.map((cat, i) => (
          <React.Fragment key={cat.id}>
            <CategoryCard cat={cat} index={i} />
            {i < categories.length - 1 && <SnakeConnector index={i} />}
          </React.Fragment>
        ))}

        {/* End cap */}
        <motion.div
          className="relative flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="w-3 h-3 rounded-full border-2 border-black/30 bg-white" />
        </motion.div>
      </div>
    </div>
  );
}
