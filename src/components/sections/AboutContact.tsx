"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { defaultViewport, fadeLeft, fadeRight } from "@/lib/motion";

export function AboutContact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="about"
      className="bg-brand-base min-h-[60vh] flex flex-col justify-end">
      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-end">
          <motion.div
            initial={fadeLeft.initial}
            whileInView={fadeLeft.animate}
            viewport={defaultViewport}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }
            }
            className="max-w-md space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-brand-text mb-6">
              About
            </h2>
            <div className="text-brand-text/80 text-lg leading-relaxed space-y-4">
              <p>
                SherloCod3 is the engineering log of{" "}
                <strong>Alexandre Cavalari</strong>, a Full Stack Engineer
                transitioning from deep data/SQL roots into comprehensive
                scalable architecture.
              </p>
              <p>Based in Brazil. Working beyond borders.</p>
            </div>
          </motion.div>

          <motion.div
            initial={fadeRight.initial}
            whileInView={fadeRight.animate}
            viewport={defaultViewport}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.2 }
            }
            className="md:text-right space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-brand-text mb-6">
              Contact
            </h2>
            <p className="text-brand-text/80 text-lg font-mono">
              Open to engineering conversations
            </p>
            <div className="flex flex-col md:items-end gap-4 font-mono text-brand-text/60">
              <a
                href="mailto:contact@sherlocod3.dev"
                className="hover:text-brand-highlight transition-colors">
                contact@sherlocod3.dev
              </a>
              <a
                href="https://linkedin.com/in/alexandrecavalari"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-highlight transition-colors">
                LinkedIn
              </a>
              <a
                href="https://github.com/AlexandreCavalari"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-highlight transition-colors">
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={defaultViewport}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.5 }
        }
        className="mt-16 py-8 border-t border-brand-text/5 text-center font-mono text-xs text-brand-text/40">
        SherloCod3 · Engineering Logbook · © {new Date().getFullYear()}{" "}
        Alexandre Cavalari
      </motion.footer>
    </Section>
  );
}
