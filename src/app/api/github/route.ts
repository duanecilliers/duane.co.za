import { NextResponse } from "next/server";
import { getRecentActivity } from "@/lib/github";

export async function GET() {
  try {
    const commits = await getRecentActivity("duanecilliers");

    return NextResponse.json(
      { commits },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { commits: [] },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  }
}
