"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/layout/section";
import { siteData } from "@/data/site";

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const listItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function Now() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { updated, items } = siteData.now;

  return (
    <Section id="now" title="Now">
      <div ref={ref}>
        <motion.p
          className="mb-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          Updated {updated}
        </motion.p>

        <motion.ul
          className="max-w-2xl space-y-3"
          variants={listContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {items.map((item, i) => (
            <motion.li
              key={i}
              variants={listItem}
              className="flex items-start gap-3 text-muted-foreground"
            >
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-brand" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
