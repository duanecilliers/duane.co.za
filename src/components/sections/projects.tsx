"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/ui/project-card";
import { siteData } from "@/data/site";

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function Projects() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: "-60px" });
  const clientInView = useInView(clientRef, { once: true, margin: "-60px" });

  return (
    <Section id="projects" title="Projects">
      {/* Featured */}
      <div className="mb-12" ref={featuredRef}>
        <h3 className="mb-6 text-lg font-semibold">Featured</h3>
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={grid}
          initial="hidden"
          animate={featuredInView ? "show" : "hidden"}
        >
          {siteData.projects.featured.map((project) => (
            <motion.div key={project.title} variants={card}>
              <ProjectCard project={project} variant="featured" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Client Work */}
      <div ref={clientRef}>
        <h3 className="mb-6 text-lg font-semibold">Client Work</h3>
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={grid}
          initial="hidden"
          animate={clientInView ? "show" : "hidden"}
        >
          {siteData.projects.client.map((project) => (
            <motion.div key={project.title} variants={card}>
              <ProjectCard project={project} variant="compact" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
