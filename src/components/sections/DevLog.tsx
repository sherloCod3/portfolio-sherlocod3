"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const logs = [
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
    tag: "ASYNC",
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

export function DevLog() {
  return (
    <Section id="dev-log" className="bg-brand-base relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Dev Log
          </h2>
          <p className="font-mono text-brand-text/50">
            Engineering Notes & Decisions
          </p>
        </motion.div>

        <div className="space-y-24">
          {logs.map((log, idx) => (
            <motion.div
              key={log.id}
              id={log.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-16 border-l border-brand-text/10">
              {/* Tag marker */}
              <div className="absolute top-0 -left-[1px] -translate-x-1/2 bg-brand-base text-brand-text/50 font-mono text-xs [writing-mode:vertical-rl] rotate-180 tracking-[0.3em] py-4 h-32 border-r border-brand-text/10 whitespace-nowrap">
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
                    <span className="text-brand-text/50 block mb-1">Why:</span>
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
        </div>
      </Container>
    </Section>
  );
}
