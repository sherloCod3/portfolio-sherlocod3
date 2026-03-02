"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const defaultTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: "easeOut" as const };

  const typewriterStr = "Systems improve when decisions accumulate.";
  const showTypewriter = !shouldReduceMotion;

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-brand-base/50 to-brand-base pointer-events-none z-0" />

      <div className="z-10 text-center space-y-8 max-w-4xl px-6 w-full flex flex-col items-center">
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={defaultTransition}
          className="space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-brand-text">
            SherloCod3
          </h1>
          <p className="text-brand-text/70 font-mono tracking-widest uppercase text-sm md:text-base">
            Engineering Logbook
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.5 }
          }
          className="mt-16 pt-16 space-y-2 text-lg md:text-xl font-mono text-brand-text/90 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-brand-highlight/50" />

          <p className="flex justify-center flex-wrap">
            {showTypewriter
              ? typewriterStr.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.8 + index * 0.03 }}
                    className="inline-block whitespace-pre">
                    {char}
                  </motion.span>
                ))
              : typewriterStr}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.5,
                    delay: 0.8 + typewriterStr.length * 0.03 + 0.3,
                  }
            }
            className="opacity-70">
            So do engineers.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 1.5 }
          }
          className="mt-24 pt-12 flex justify-center">
          <a
            href="#selected-systems"
            className="group cursor-pointer flex items-center gap-3 border border-brand-metric/30 bg-transparent px-8 py-4 font-mono text-sm tracking-widest text-brand-text hover:border-brand-highlight hover:bg-brand-highlight/10 transition-all duration-300 uppercase relative overflow-hidden">
            <span className="relative z-10">Explore the evolution</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
