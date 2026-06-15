"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
  RotateCcw,
  Grid,
  Network,
  ArrowRight,
  Sparkles
} from "lucide-react";

type Point = { x: number; y: number };

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Layout,
    description: "Building responsive, component-driven, and highly-performant user interfaces.",
    skills: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    description: "Developing robust APIs, microservices, and server-side application logic.",
    skills: [
      { name: "Node.js", level: "Expert" },
      { name: "NestJS", level: "Advanced" },
      { name: "Express", level: "Expert" },
      { name: "Prisma", level: "Advanced" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    description: "Designing scalable database schemas, query optimization, and data modeling.",
    skills: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Cloud,
    description: "Configuring containerization, CI/CD automated pipelines, and cloud deployment.",
    skills: [
      { name: "Docker", level: "Advanced" },
      { name: "CI/CD", level: "Intermediate" },
      { name: "Linux", level: "Advanced" },
      { name: "Vercel", level: "Expert" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    description: "Leveraging utility software for collaboration, version control, and API testing.",
    skills: [
      { name: "Git", level: "Expert" },
      { name: "Figma", level: "Intermediate" },
      { name: "Postman", level: "Advanced" },
    ],
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
      children[`${category.id}:${skill.name}`] = {
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
  const [viewMode, setViewMode] = useState<"constellation" | "bento">("constellation");

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
        id: `${category.id}:${skill.name}`,
        parentId: category.id,
        childId: `${category.id}:${skill.name}`,
      }))
    );
  }, []);

  const activeParentId = activeChild ? activeChild.split(":")[0] : activeParent;

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="absolute inset-0 skills-grid opacity-45" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),rgba(255,255,255,0))] blur-2xl pointer-events-none" />
      <div className="absolute -bottom-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.06),rgba(255,255,255,0))] blur-3xl pointer-events-none" />

      <div className="relative mx-auto flex w-full flex-col gap-8 px-5 pb-24 pt-20 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-8">
          <div className="flex flex-col gap-3">
            <motion.div
              className="text-[11px] uppercase tracking-[0.35em] text-black/45 font-bold flex items-center gap-1.5"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Expertise & Tech Stack
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tight uppercase"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Skills Space
            </motion.h1>
            <motion.p
              className="max-w-xl text-sm text-black/55 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Exploring technologies through two lenses: drag nodes freely in the 
              interactive constellation, or switch to the clean structured bento directory.
            </motion.p>
          </div>

          {/* Elegant Toggle Selector */}
          <motion.div 
            className="flex items-center self-start md:self-auto bg-black/5 p-1 rounded-full border border-black/5 z-25"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setViewMode("constellation")}
              className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 select-none cursor-pointer ${
                viewMode === "constellation" ? "text-white" : "text-black/60 hover:text-black"
              }`}
            >
              {viewMode === "constellation" && (
                <motion.span
                  layoutId="active-view-pill"
                  className="absolute inset-0 bg-black rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Network className="w-3.5 h-3.5" />
              Constellation
            </button>
            <button
              onClick={() => setViewMode("bento")}
              className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 select-none cursor-pointer ${
                viewMode === "bento" ? "text-white" : "text-black/60 hover:text-black"
              }`}
            >
              {viewMode === "bento" && (
                <motion.span
                  layoutId="active-view-pill"
                  className="absolute inset-0 bg-black rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Grid className="w-3.5 h-3.5" />
              Bento Grid
            </button>
          </motion.div>
        </div>

        <div
          ref={containerRef}
          className="relative w-full min-h-[550px] h-[70vh] max-h-[820px] rounded-[32px] border border-black/10 bg-white/80 backdrop-blur-xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {viewMode === "constellation" ? (
              <motion.div
                key="constellation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* SVG Connections Canvas */}
                <svg
                  className="absolute inset-0 h-full w-full z-0 pointer-events-none"
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
                      <motion.path
                        key={connector.id}
                        d={getPath(parent, child)}
                        stroke={active ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.12)"}
                        strokeWidth={active ? 1.5 : 0.8}
                        strokeLinecap="round"
                        fill="none"
                        filter={active ? "url(#lineGlow)" : undefined}
                        className={active ? "animate-marching-ants" : ""}
                        style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                      />
                    );
                  })}
                </svg>

                {/* Parent Category Nodes */}
                {categories.map((category) => {
                  const position = parentPositions[category.id];
                  const isActive = activeParentId === category.id;
                  const IconComponent = category.icon;

                  return (
                    <motion.div
                      key={category.id}
                      drag
                      dragMomentum={false}
                      dragElastic={0.15}
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
                      className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none rounded-full border backdrop-blur-md transition-all duration-300 active:cursor-grabbing flex items-center justify-center ${
                        isActive
                          ? "border-black bg-white shadow-[0_0_35px_rgba(0,0,0,0.12)]"
                          : "border-black/10 bg-white/95 text-black/80 hover:border-black/30 shadow-2xs"
                      }`}
                      style={{
                        left: position?.x ?? 0,
                        top: position?.y ?? 0,
                        width: bounds.width < 768 ? 100 : 124,
                        height: bounds.width < 768 ? 100 : 124,
                      }}
                    >
                      <div className="flex flex-col items-center justify-center p-3 text-center gap-1.5">
                        <IconComponent className={`w-4 h-4 md:w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-black' : 'text-black/60'}`} />
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                          {category.label}
                        </span>
                        <span className="text-[8px] md:text-[9px] font-medium px-2 py-0.5 rounded-full bg-black/5 text-black/55">
                          {category.skills.length} skills
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Child Skill Nodes */}
                {categories.map((category) =>
                  category.skills.map((skill, index) => {
                    const id = `${category.id}:${skill.name}`;
                    const position = childPositions[id];
                    const isActive = activeParentId === category.id || activeChild === id;
                    const isDirectActive = activeChild === id;

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
                        onMouseLeave={() => {
                          setActiveChild(null);
                        }}
                        className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none rounded-full border px-3.5 py-1.5 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 active:cursor-grabbing flex items-center gap-1.5 ${
                          isActive
                            ? isDirectActive
                              ? "border-black bg-white text-black shadow-[0_0_20px_rgba(0,0,0,0.1)] scale-105"
                              : "border-black/50 bg-white text-black/90"
                            : "border-black/10 bg-white/90 text-black/60 hover:border-black/25"
                        } float-slow`}
                        style={{
                          left: position?.x ?? 0,
                          top: position?.y ?? 0,
                          animationDuration: `${10 + index * 0.8}s`,
                        }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          isDirectActive ? "bg-black scale-110" : isActive ? "bg-black/60" : "bg-black/25"
                        }`} />
                        {skill.name}
                      </motion.div>
                    );
                  })
                )}

                {/* Float Controls Interface */}
                {/* Reset Button */}
                <div className="absolute bottom-6 right-6 z-30 pointer-events-auto">
                  <button
                    onClick={() => {
                      const initial = buildInitialPositions(bounds);
                      setParentPositions(initial.parents);
                      setChildPositions(initial.children);
                      setActiveParent(null);
                      setActiveChild(null);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-black/10 bg-white/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-black/60 hover:text-black hover:border-black/35 shadow-2xs hover:shadow-xs rounded-full transition-all duration-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Graph
                  </button>
                </div>

                {/* Floating Info Inspector */}
                <div className="absolute bottom-6 left-6 z-30 pointer-events-auto max-w-[280px] md:max-w-[340px]">
                  <motion.div 
                    className="border border-black/10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xs flex flex-col gap-1.5"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeChild ? (
                      (() => {
                        const [catId, skillName] = activeChild.split(":");
                        const skillObj = categories.find(c => c.id === catId)?.skills.find(s => s.name === skillName);
                        const catLabel = categories.find(c => c.id === catId)?.label;
                        return (
                          <>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                              Skill Details ({catLabel})
                            </span>
                            <h3 className="text-sm font-bold tracking-tight text-black">
                              {skillName}
                            </h3>
                            <span className="text-[10px] font-medium text-black/60">
                              Proficiency: <span className="font-semibold text-black">{skillObj?.level}</span>
                            </span>
                          </>
                        );
                      })()
                    ) : activeParent ? (
                      (() => {
                        const catObj = categories.find(c => c.id === activeParent);
                        return (
                          <>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                              Category Focus
                            </span>
                            <h3 className="text-sm font-bold tracking-tight text-black">
                              {catObj?.label} Architecture
                            </h3>
                            <p className="text-[10px] leading-normal text-black/60 font-medium">
                              {catObj?.description}
                            </p>
                          </>
                        );
                      })()
                    ) : (
                      <>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                          Interactive Space
                        </span>
                        <h3 className="text-sm font-bold tracking-tight text-black flex items-center gap-1">
                          Constellation Map
                        </h3>
                        <p className="text-[10px] leading-normal text-black/55 font-medium">
                          Hover over any node to trace relationships, or drag nodes to custom layout shapes.
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="bento"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full overflow-y-auto no-scrollbar p-6 md:p-8 z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full h-auto">
                  {categories.map((category, catIdx) => {
                    const IconComponent = category.icon;
                    const spanClass = 
                      category.id === "frontend" || category.id === "backend" 
                        ? "md:col-span-3" 
                        : "md:col-span-2";

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: catIdx * 0.1, ease: "easeOut" }}
                        className={`${spanClass} border border-black/10 bg-white/70 hover:bg-white/95 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-2xs hover:shadow-xs group relative overflow-hidden backdrop-blur-md`}
                      >
                        {/* Decorative background circle */}
                        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-black/[0.02] group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                        
                        <div>
                          {/* Top row */}
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-black/5 bg-black/5 text-black group-hover:border-black/25 group-hover:bg-white transition-all duration-300">
                              <IconComponent className="w-4 h-4 text-black/75 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-black/5 text-black/60">
                              {category.skills.length} skills
                            </span>
                          </div>

                          {/* Info */}
                          <h3 className="text-md font-bold uppercase tracking-[0.15em] text-black mt-4">
                            {category.label}
                          </h3>
                          <p className="text-[11px] text-black/55 mt-1.5 leading-relaxed font-medium">
                            {category.description}
                          </p>
                        </div>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-2 mt-5 z-10">
                          {category.skills.map((skill, sIdx) => (
                            <div
                              key={sIdx}
                              className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-black/5 bg-white/90 text-black/70 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:border-black/40 hover:text-black hover:scale-103"
                              title={`Proficiency: ${skill.level}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                skill.level === "Expert" 
                                  ? "bg-black" 
                                  : skill.level === "Advanced"
                                    ? "bg-black/60"
                                    : "bg-black/30"
                              }`} />
                              {skill.name}
                              <span className="text-[7px] font-medium text-black/35 normal-case ml-0.5">
                                {skill.level}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
