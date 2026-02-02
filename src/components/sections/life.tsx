"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/layout/section";
import { siteData } from "@/data/site";

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function Life() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="life" title="Life">
      <motion.div
        ref={ref}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={grid}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {siteData.hobbies.map((hobby) => (
          <motion.div
            key={hobby.name}
            variants={card}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-lg border border-border/50 bg-card/50 p-5 text-center transition-all duration-200 hover:border-accent-brand/30 hover:shadow-lg hover:shadow-accent-brand/5"
          >
            <span className="mb-2 block text-3xl">{hobby.emoji}</span>
            <h4 className="font-semibold">{hobby.name}</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              {hobby.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
