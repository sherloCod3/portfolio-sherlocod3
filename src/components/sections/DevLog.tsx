"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { defaultViewport } from "@/lib/motion";

type LogTag = "SQL" | "Async" | "Frontend" | "Infra";

interface LogEntry {
  id: string;
  date: string;
  tag: LogTag;
  context: string;
  decision: string;
  why: string;
  impact: string;
  note: string;
}

const logs: LogEntry[] = [
  {
    id: "log-reports",
    date: "2024-10-12",
    tag: "SQL",
    context:
      "Reports engine timing out on 5M+ row aggregations due to generic ORM queries.",
    decision:
      "Bypassed ORM for complex read queries. Implemented raw CTEs and materialized views for common date ranges.",
    why: "ORMs optimize for writes and simple relations, not analytical aggregations. The abstraction leaked performance.",
    impact: "P99 latency dropped from 8.4s to 1.2s.",
    note: "Abstractions are nice until they cost you users. Know when to drop down.",
  },
  {
    id: "log-async",
    date: "2024-08-03",
    tag: "Async",
    context:
      "Synchronous webhook processing failing under burst loads, losing critical external syncs.",
    decision:
      "Offloaded all webhook processing to Redis-backed BullMQ queues with exponential backoff.",
    why: "Immediate consistency was not required. Eventual consistency under controlled throughput guarantees zero loss.",
    impact:
      "0 dropped webhooks over the last 90 days. Peak burst handling improved 10x.",
    note: "Queues are not about speed. They are about control. Blocking is easy. Scaling is deliberate.",
  },
];

const TAG_FILTERS = ["All", "SQL", "Async", "Frontend", "Infra"] as const;
type TagFilter = (typeof TAG_FILTERS)[number];

const tagColor: Record<LogTag, string> = {
  SQL: "text-brand-highlight",
  Async: "text-teal-400",
  Frontend: "text-emerald-400",
  Infra: "text-amber-400",
};

export function DevLog() {
  const [activeTag, setActiveTag] = useState<TagFilter>("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered =
    activeTag === "All" ? logs : logs.filter((l) => l.tag === activeTag);

  return (
    <Section id="dev-log" className="bg-brand-base relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Dev Log
          </h2>
          <p className="font-mono text-brand-text/50">
            Engineering Notes &amp; Decisions
          </p>
        </motion.div>

        {/* Tag filter */}
        <div className="mb-14 flex gap-2 flex-wrap">
          {TAG_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`cursor-pointer font-mono text-xs px-4 py-2 border transition-colors ${
                activeTag === t
                  ? "border-brand-highlight bg-brand-highlight/10 text-brand-highlight"
                  : "border-brand-text/20 text-brand-text/50 hover:border-brand-text/40 hover:text-brand-text/80"
              }`}>
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((log, idx) => (
              <motion.div
                key={log.id}
                id={log.id}
                layout
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.45, delay: idx * 0.08 }
                }
                className="relative pl-8 md:pl-16 border-l border-brand-text/10">
                {/* Vertical tag label */}
                <div
                  className={`absolute top-0 -left-px -translate-x-1/2 font-mono text-xs [writing-mode:vertical-rl] rotate-180 tracking-[0.3em] py-4 h-32 whitespace-nowrap ${tagColor[log.tag]}`}>
                  {log.tag}
                </div>

                <div className="space-y-8 font-mono text-sm max-w-3xl">
                  <div className="text-brand-text/40">[{log.date}]</div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-brand-text/50 block mb-1">
                        Context:
                      </span>
                      <p className="text-brand-text/90 leading-relaxed">
                        {log.context}
                      </p>
                    </div>
                    <div>
                      <span className="text-brand-text/50 block mb-1">
                        Decision:
                      </span>
                      <p className="text-brand-text/90 leading-relaxed">
                        {log.decision}
                      </p>
                    </div>
                    <div>
                      <span className="text-brand-text/50 block mb-1">
                        Why:
                      </span>
                      <p className="text-brand-text/90 leading-relaxed">
                        {log.why}
                      </p>
                    </div>
                    <div>
                      <span className="text-brand-text/50 block mb-1">
                        Impact:
                      </span>
                      <p className="text-brand-metric font-medium">
                        {log.impact}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-highlight/20">
                    <span className="text-brand-highlight/60 block mb-1 text-xs uppercase">
                      Note:
                    </span>
                    <p className="text-brand-highlight italic">{log.note}</p>
                    <div className="text-brand-highlight/60 text-xs mt-2 text-right">
                      — SC3
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="font-mono text-sm text-brand-text/40 py-12 text-center">
              No log entries for this tag.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
