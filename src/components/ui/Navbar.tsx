"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Systems", href: "#selected-systems" },
  { label: "Dev Log", href: "#dev-log" },
  { label: "Notes", href: "#notes" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      aria-hidden={!visible}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pointer-events-none",
        visible && "pointer-events-auto",
      )}>
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between border-b border-brand-text/10 bg-brand-base/80 backdrop-blur-md">
        {/* Brand signature */}
        <a
          href="#"
          className="font-mono text-sm text-brand-highlight tracking-widest uppercase hover:text-brand-text transition-colors">
          SC3
        </a>

        {/* Section anchors */}
        <nav aria-label="Portfolio sections">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs text-brand-text/60 hover:text-brand-highlight transition-colors tracking-wide">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
