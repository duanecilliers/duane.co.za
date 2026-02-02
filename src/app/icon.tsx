import { ImageResponse } from "@vercel/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#22d3ee",
            letterSpacing: "-0.02em",
          }}
        >
          DC
        </div>
      </div>
    ),
    { ...size }
  );
}
