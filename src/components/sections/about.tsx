"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/layout/section";
import { siteData } from "@/data/site";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="about" title="About">
      <motion.div
        ref={ref}
        className="max-w-2xl space-y-4"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {siteData.about.paragraphs.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </motion.div>
    </Section>
  );
}
