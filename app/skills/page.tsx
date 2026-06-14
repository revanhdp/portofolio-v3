"use client";

import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Point = { x: number; y: number };

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Node.js", "NestJS", "Express", "Prisma"],
  },
  {
    id: "database",
    label: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: ["Docker", "CI/CD", "Linux", "Vercel"],
  },
  {
    id: "tools",
    label: "Tools",
    skills: ["Git", "Figma", "Postman"],
  },
];

const parentLayout = [
  { id: "frontend", x: 0.22, y: 0.32 },
  { id: "backend", x: 0.6, y: 0.24 },
  { id: "database", x: 0.78, y: 0.55 },
  { id: "devops", x: 0.4, y: 0.7 },
  { id: "tools", x: 0.18, y: 0.75 },
];

function buildInitialPositions(bounds: { width: number; height: number }) {
  const width = Math.max(bounds.width, 320);
  const height = Math.max(bounds.height, 520);

  const parents: Record<string, Point> = {};
  parentLayout.forEach((item) => {
    parents[item.id] = {
      x: Math.round(item.x * width),
      y: Math.round(item.y * height),
    };
  });

  const children: Record<string, Point> = {};
  categories.forEach((category) => {
    const center = parents[category.id];
    if (!center) {
      return;
    }

    const radius = category.skills.length > 3 ? 150 : 130;
    const angleStep = (Math.PI * 2) / category.skills.length;

    category.skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 3;
      children[`${category.id}:${skill}`] = {
        x: Math.round(center.x + Math.cos(angle) * radius),
        y: Math.round(center.y + Math.sin(angle) * radius),
      };
    });
  });

  return { parents, children };
}

function getPath(parent: Point, child: Point) {
  const midX = (parent.x + child.x) / 2;
  const midY = (parent.y + child.y) / 2;
  const curve = 28;
  return `M ${parent.x} ${parent.y} Q ${midX + curve} ${midY - curve} ${child.x} ${child.y}`;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [parentPositions, setParentPositions] = useState<Record<string, Point>>({});
  const [childPositions, setChildPositions] = useState<Record<string, Point>>({});
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const [activeChild, setActiveChild] = useState<string | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  useEffect(() => {
    if (!bounds.width || Object.keys(parentPositions).length > 0) {
      return;
    }
    const initial = buildInitialPositions(bounds);
    setParentPositions(initial.parents);
    setChildPositions(initial.children);
  }, [bounds, parentPositions]);

  const connectorData = useMemo(() => {
    return categories.flatMap((category) =>
      category.skills.map((skill) => ({
        id: `${category.id}:${skill}`,
        parentId: category.id,
        childId: `${category.id}:${skill}`,
      }))
    );
  }, []);

  const activeParentId = activeChild ? activeChild.split(":")[0] : activeParent;

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="absolute inset-0 skills-grid opacity-40" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.14),rgba(255,255,255,0))] blur-2xl" />
      <div className="absolute -bottom-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.1),rgba(255,255,255,0))] blur-3xl" />

      <div className="relative mx-auto flex w-full flex-col gap-10 px-5 pb-24 pt-20 md:px-12">
        <div className="flex flex-col gap-4">
          <motion.div
            className="text-[11px] uppercase tracking-[0.35em] text-black/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Skills Constellation
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Draggable Node Graph
          </motion.h1>
          <motion.p
            className="max-w-2xl text-sm md:text-base text-black/55"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            Drag any node freely. Connected lines stay locked, revealing a clean
            monochrome skill constellation.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full min-h-[520px] h-[70vh] max-h-[820px] rounded-[32px] border border-black/10 bg-white/80 backdrop-blur-xl"
        >
          <svg
            className="absolute inset-0 h-full w-full z-0"
            viewBox={`0 0 ${Math.max(bounds.width, 1)} ${Math.max(bounds.height, 1)}`}
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {connectorData.map((connector) => {
              const parent = parentPositions[connector.parentId];
              const child = childPositions[connector.childId];
              if (!parent || !child) {
                return null;
              }

              const active =
                activeParentId === connector.parentId || activeChild === connector.childId;

              return (
                <path
                  key={connector.id}
                  d={getPath(parent, child)}
                  stroke={active ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.2)"}
                  strokeWidth={active ? 1.4 : 1}
                  strokeLinecap="round"
                  fill="none"
                  filter={active ? "url(#lineGlow)" : undefined}
                />
              );
            })}
          </svg>

          {categories.map((category) => {
            const position = parentPositions[category.id];
            const isActive = activeParentId === category.id;

            return (
              <motion.div
                key={category.id}
                drag
                dragMomentum={false}
                dragElastic={0.18}
                onDrag={(event, info) => {
                  setParentPositions((prev) => ({
                    ...prev,
                    [category.id]: {
                      x: (prev[category.id]?.x ?? 0) + info.delta.x,
                      y: (prev[category.id]?.y ?? 0) + info.delta.y,
                    },
                  }));
                }}
                onMouseEnter={() => setActiveParent(category.id)}
                onMouseLeave={() => setActiveParent(null)}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none rounded-full border backdrop-blur-md transition-all duration-300 active:cursor-grabbing ${
                  isActive
                    ? "border-black/70 bg-white shadow-[0_0_40px_rgba(0,0,0,0.25)]"
                    : "border-black/25 bg-white"
                } float-slow`}
                style={{ left: position?.x ?? 0, top: position?.y ?? 0 }}
              >
                <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full text-center text-sm font-semibold uppercase tracking-[0.2em] text-black md:h-[150px] md:w-[150px]">
                  {category.label}
                </div>
              </motion.div>
            );
          })}

          {categories.map((category) =>
            category.skills.map((skill, index) => {
              const id = `${category.id}:${skill}`;
              const position = childPositions[id];
              const isActive = activeParentId === category.id || activeChild === id;

              return (
                <motion.div
                  key={id}
                  drag
                  dragMomentum={false}
                  dragElastic={0.2}
                  onDrag={(event, info) => {
                    setChildPositions((prev) => ({
                      ...prev,
                      [id]: {
                        x: (prev[id]?.x ?? 0) + info.delta.x,
                        y: (prev[id]?.y ?? 0) + info.delta.y,
                      },
                    }));
                  }}
                  onMouseEnter={() => {
                    setActiveParent(category.id);
                    setActiveChild(id);
                  }}
                  onMouseLeave={() => setActiveChild(null)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 active:cursor-grabbing ${
                    isActive
                      ? "border-black/70 bg-white text-black shadow-[0_0_24px_rgba(0,0,0,0.2)]"
                      : "border-black/20 bg-white text-black/70"
                  } float-slow`}
                  style={{
                    left: position?.x ?? 0,
                    top: position?.y ?? 0,
                    animationDuration: `${8 + index * 0.8}s`,
                  }}
                >
                  {skill}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
