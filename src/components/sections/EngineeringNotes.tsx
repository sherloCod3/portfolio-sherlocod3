"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion, useReducedMotion } from "framer-motion";
import { defaultViewport, fadeUp } from "@/lib/motion";

const notes = [
  [
    "Scaling is not a feature.",
    "It is a consequence of decisions",
    "made when nothing was breaking.",
  ],
  [
    "Write code for humans.",
    "Optimize systems for machines.",
    "Confuse the two at your own peril.",
  ],
  [
    "The best architecture is the one",
    "you don't have to rewrite when",
    "requirements inevitably change.",
  ],
];

export function EngineeringNotes() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="bg-brand-highlight/5 border-y border-brand-highlight/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {notes.map((note, idx) => (
            <motion.div
              key={idx}
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={defaultViewport}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: idx * 0.15 }
              }
              className="font-mono text-sm md:text-base leading-relaxed space-y-1 relative">
              <div className="absolute -top-4 -left-4 text-4xl text-brand-highlight/20 select-none font-sans">
                &quot;
              </div>
              {note.map((line, lineIdx) => (
                <p
                  key={lineIdx}
                  className={
                    lineIdx === 0 ? "text-brand-text" : "text-brand-text/70"
                  }>
                  {line}
                </p>
              ))}
              <div className="pt-4 text-brand-highlight/60 text-xs text-right">
                — SC3
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
