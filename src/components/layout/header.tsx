"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => {
        const aTop = a.boundingClientRect.top;
        const bTop = b.boundingClientRect.top;
        return Math.abs(aTop) - Math.abs(bTop);
      });

    if (visible.length > 0) {
      setActiveSection(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    const sectionIds = siteData.nav.map((item) =>
      item.href.replace("#", "")
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [handleIntersection]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-sm font-semibold tracking-tight"
        >
          dc.
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {siteData.nav.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative px-3 py-2 text-sm transition-colors hover:text-foreground"
                style={{
                  color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-x-1 -bottom-[1px] h-px bg-accent-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          <div className="ml-2 border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent"
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {siteData.nav.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                    style={{
                      color: isActive
                        ? "var(--accent-brand)"
                        : "var(--muted-foreground)",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
