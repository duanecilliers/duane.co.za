import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export const alt = "Duane Cilliers — Maker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Duane Cilliers
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a3a3a3",
              lineHeight: 1.4,
            }}
          >
            Maker · Developer · Cape Town
          </div>
          <div
            style={{
              marginTop: "16px",
              width: "64px",
              height: "4px",
              background: "#22d3ee",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
