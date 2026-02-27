"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-base/50 to-brand-base pointer-events-none z-0" />

      <div className="z-10 text-center space-y-8 max-w-4xl px-6 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-brand-text">
            SherloCod3
          </h1>
          <p className="text-xl md:text-2xl text-brand-text/70 font-mono tracking-widest uppercase text-sm md:text-base">
            Engineering Logbook
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-16 space-y-2 text-lg md:text-xl font-mono text-brand-text/90 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-brand-highlight/50" />
          <p>Systems improve when decisions accumulate.</p>
          <p className="opacity-70">So do engineers.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 pt-12 flex justify-center">
          <a
            href="#selected-systems"
            className="group flex items-center gap-3 border border-brand-metric/30 bg-transparent px-8 py-4 font-mono text-sm tracking-widest text-brand-text hover:border-brand-highlight hover:bg-brand-highlight/10 transition-all duration-300 uppercase relative overflow-hidden">
            <span className="relative z-10">Explore the evolution</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
