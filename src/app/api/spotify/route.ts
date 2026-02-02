import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";

export async function GET() {
  // Check if env vars are configured
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return NextResponse.json(
      { isPlaying: false, configured: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  }

  try {
    // Try now playing first
    const nowPlaying = await getNowPlaying();
    if (nowPlaying) {
      return NextResponse.json(nowPlaying, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      });
    }

    // Fallback to recently played
    const recent = await getRecentlyPlayed();
    if (recent) {
      return NextResponse.json(recent, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      });
    }

    return NextResponse.json(
      { isPlaying: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { isPlaying: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  }
}
