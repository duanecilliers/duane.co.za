"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [isTouch, setIsTouch] = useState(true); // default hidden, show only on non-touch

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 40 });

  useEffect(() => {
    // Detect touch devices
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsTouch(isTouchDevice);

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] hidden dark:block"
      style={{
        background: `radial-gradient(500px circle at var(--glow-x) var(--glow-y), rgba(34, 211, 238, 0.06), rgba(14, 165, 233, 0.03) 40%, transparent 70%)`,
      }}
    >
      <motion.div
        className="absolute h-0 w-0"
        style={{
          // Use a hidden element to drive CSS custom properties via inline style
          // This is a workaround — we set the gradient via a wrapping div
        }}
      />
      {/* Actual glow element */}
      <motion.div
        className="pointer-events-none fixed h-[1000px] w-[1000px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.07) 0%, rgba(14, 165, 233, 0.03) 35%, transparent 65%)",
        }}
      />
    </motion.div>
  );
}
