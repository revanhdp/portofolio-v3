"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Experience() {
  const experiences = [
    {
      id: 1,
      date: "2021 — PRESENT",
      role: "Design Director",
      company: "Studio Archive",
      description: "Leading the visual design team, establishing global design systems, and overseeing high-profile digital campaigns for luxury sector clients. Managing a cross-functional team of 15 elite creatives and driving strict adherence to minimalist architectural principles.",
    },
    {
      id: 2,
      date: "2018 — 2021",
      role: "Senior UI Architect",
      company: "Acme Global",
      description: "Spearheaded the complete visual redesign of the core enterprise product suite, improving user retention by 40% and winning three industry awards for interface clarity and accessibility. Developed the foundational token structure still in use today.",
    },
    {
      id: 3,
      date: "2015 — 2018",
      role: "Interaction Designer",
      company: "Creative Bureau",
      description: "Developed complex interactive prototypes and motion guidelines for emerging tech platforms. Collaborated closely with engineering teams to bridge the gap between high-fidelity concept art and production-ready code.",
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pt-20 pb-40">
      {/* Header */}
      <div className="mb-24 px-4 md:px-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black uppercase mb-6">
          Experience
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
          A continuous trajectory of design excellence, system architecture, and creative leadership across leading international studios.
        </p>
      </div>

      {/* Snake Timeline */}
      <div className="flex flex-col w-full px-4 md:px-12">
        {experiences.map((exp, index) => {
          const isEven = index % 2 !== 0;
          const isLast = index === experiences.length - 1;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative w-full flex ${isEven ? 'justify-end border-t border-l border-black' : 'justify-start border-t border-r border-black'
                } ${isLast ? 'border-b' : ''} pt-16 pb-24`}
            >
              {/* Starting Dot - Only on the very first item */}
              {index === 0 && (
                <div className="absolute top-[-5px] left-[-5px] w-2.5 h-2.5 bg-black rounded-full" />
              )}

              {/* Content Box */}
              <div className={`w-full md:w-3/4 ${isEven ? 'text-right pr-6 md:pr-16 md:pl-0 pl-6' : 'text-left pl-6 md:pl-16 pr-6 md:pr-0'}`}>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-6 block uppercase">{exp.date}</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-black mb-2">{exp.role}</h2>
                <h3 className="text-xl text-gray-500 mb-6 font-medium">{exp.company}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
