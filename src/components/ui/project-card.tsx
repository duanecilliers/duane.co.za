"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/site";

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  client: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 font-mono text-xs ${statusColors[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "compact";
}

export function ProjectCard({ project, variant = "featured" }: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group rounded-lg border border-border/50 bg-card transition-all duration-200 hover:border-accent-brand/30 hover:shadow-lg hover:shadow-accent-brand/5 ${
        isFeatured ? "p-6" : "p-5"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h4 className={isFeatured ? "text-lg font-semibold" : "font-semibold"}>
          {project.title}
        </h4>
        <StatusBadge status={project.status} />
      </div>

      <p
        className={`mb-4 text-sm leading-relaxed text-muted-foreground ${
          !isFeatured ? "line-clamp-2" : ""
        }`}
      >
        {project.description}
      </p>

      <TechTags tech={project.tech} />

      {(project.url || project.github) && (
        <div className="mt-4 flex items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent-brand transition-colors hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visit
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
