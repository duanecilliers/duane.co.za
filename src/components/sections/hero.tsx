"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { siteData } from "@/data/site";
import { SpotifyWidget } from "@/components/widgets/spotify";
import { GitHubWidget } from "@/components/widgets/github";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  const { name, title, subtitle, location, socials } = siteData.hero;

  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-center">
      <motion.div
        className="mx-auto max-w-5xl px-4 sm:px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-3 font-mono text-sm text-accent-brand"
        >
          {location}
        </motion.p>

        <motion.p
          variants={item}
          className="mb-1 font-mono text-lg text-muted-foreground"
        >
          {name}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex items-center gap-3">
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors duration-200 hover:border-accent-brand/40 hover:text-accent-brand"
              >
                {Icon ? <Icon className="h-5 w-5" /> : social.name}
              </a>
            );
          })}
        </motion.div>

        {/* Widgets */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <SpotifyWidget />
          <GitHubWidget />
        </motion.div>
      </motion.div>
    </section>
  );
}
