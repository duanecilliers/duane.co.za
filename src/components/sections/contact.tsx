"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { Section } from "@/components/layout/section";
import { siteData } from "@/data/site";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { email, available, description } = siteData.contact;

  return (
    <Section id="contact" title="Contact">
      <motion.div
        ref={ref}
        className="max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="mb-4 leading-relaxed text-muted-foreground">
          {description}
        </p>

        <p className="mb-6 flex items-center gap-2 text-sm">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              available
                ? "animate-pulse bg-green-500"
                : "bg-red-500"
            }`}
          />
          <span className="text-muted-foreground">
            {available ? "Available for new projects" : "Fully booked"}
          </span>
        </p>

        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-brand px-5 py-2.5 font-medium text-accent-brand-foreground transition-opacity hover:opacity-90"
        >
          <Mail className="h-4 w-4" />
          {email}
        </a>
      </motion.div>
    </Section>
  );
}
