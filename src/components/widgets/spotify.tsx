"use client";

import { useEffect, useState, useCallback } from "react";
import { Music } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  configured?: boolean;
}

function EqualiserBars() {
  return (
    <div className="flex items-end gap-[2px] h-3">
      <span className="w-[3px] animate-eq-1 rounded-full bg-[#1DB954]" />
      <span className="w-[3px] animate-eq-2 rounded-full bg-[#1DB954]" />
      <span className="w-[3px] animate-eq-3 rounded-full bg-[#1DB954]" />
    </div>
  );
}

export function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify");
      const json: SpotifyData = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-3 py-2">
        <div className="h-10 w-10 animate-pulse rounded bg-muted" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  // Not configured or no data — hide entirely
  if (!data || data.configured === false || (!data.title && !data.isPlaying)) {
    return null;
  }

  return (
    <a
      href={data.songUrl ?? "https://open.spotify.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-3 py-2 transition-colors hover:border-[#1DB954]/30 hover:bg-card/80"
    >
      {data.albumImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.albumImageUrl}
          alt={data.album ?? "Album art"}
          className="h-10 w-10 rounded"
          width={40}
          height={40}
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
          <Music className="h-5 w-5 text-muted-foreground" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {data.isPlaying ? "Listening to" : "Recently played"}
        </p>
        <p className="truncate text-sm font-medium leading-tight">
          {data.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {data.artist}
        </p>
      </div>

      {data.isPlaying && <EqualiserBars />}
    </a>
  );
}
