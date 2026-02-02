"use client";

import { useEffect, useState, useCallback } from "react";
import { Github } from "lucide-react";

interface Commit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function GitHubWidget() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/github");
      const json = await res.json();
      setCommits(json.commits ?? []);
    } catch {
      setCommits([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="rounded-lg border border-border/50 bg-card/50 px-3 py-2">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
        <div className="space-y-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-3 w-full animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (commits.length === 0) return null;

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 px-3 py-2">
      <div className="mb-2 flex items-center gap-2">
        <Github className="h-4 w-4 text-muted-foreground" />
        <a
          href="https://github.com/duanecilliers"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
        >
          Recent Commits
        </a>
      </div>
      <ul className="space-y-1">
        {commits.slice(0, 5).map((commit, i) => (
          <li key={i} className="flex items-baseline gap-2 text-xs">
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 flex-1 items-baseline gap-1.5"
            >
              <span className="shrink-0 font-mono text-accent-brand">
                {commit.repo}
              </span>
              <span className="truncate text-muted-foreground group-hover:text-foreground transition-colors">
                {commit.message.length > 50
                  ? commit.message.slice(0, 50) + "…"
                  : commit.message}
              </span>
            </a>
            <span className="shrink-0 text-[10px] text-muted-foreground/70">
              {timeAgo(commit.date)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
