"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { fadeUp, defaultViewport } from "@/lib/motion";

type SystemType = "Backend" | "Full Stack" | "Frontend";

interface SystemDossier {
  id: string;
  title: string;
  role: string;
  type: SystemType;
  tags: string[];
  impact: string;
  oneLiner: string;
  challenge: string;
  solution: string;
  codeSnippet?: string;
}

const systems: SystemDossier[] = [
  {
    id: "sys-01",
    title: "Reports Engine Refactor",
    role: "Backend Architect",
    type: "Backend",
    tags: ["SQL Optimization", "Caching", "PostgreSQL"],
    impact: "8s → 1.2s",
    oneLiner: "Bypassed ORM latency on 5M+ row analytical aggregations.",
    challenge:
      "The standard ORM abstracted away the complexity of the data, resulting in massive N+1 issues and inefficient grouping queries during high-load reporting hours.",
    solution:
      "Rewrote the critical read-path using raw SQL CTEs and implemented parameterized materialized views to serve pre-computed aggregates to the frontend instantly.",
    codeSnippet: `WITH aggregated_sales AS (
  SELECT 
    date_trunc('day', created_at) as day,
    SUM(amount) as total
  FROM transactions
  WHERE status = 'settled'
  GROUP BY 1
)
SELECT * FROM aggregated_sales
WHERE total > 10000;
-- Execution time dropped 85%`,
  },
  {
    id: "sys-02",
    title: "Async Processing Pipeline",
    role: "Full Stack Engineer",
    type: "Full Stack",
    tags: ["Node.js", "BullMQ", "Redis", "React"],
    impact: "2d → 30m processing",
    oneLiner:
      "Architected a distributed queue to handle high-throughput webhook synchronization.",
    challenge:
      "The legacy synchronous system was dropping webhooks during peak bursts, and users lacked visibility into the status of their batch imports on the dashboard.",
    solution:
      "Offloaded I/O to a Redis-backed BullMQ cluster with exponential backoffs. Built a React-based realtime dashboard via WebSockets so users could monitor batch progress line-by-line.",
    codeSnippet: `// Worker Configuration
const importWorker = new Worker('BatchImports', async job => {
  const { batchId, data } = job.data;
  await processBatchInChunks(data);
  await notifyDashboardViaSocket(batchId, 'completed');
}, { 
  connection: redisConfig,
  concurrency: 50 
});`,
  },
  {
    id: "sys-03",
    title: "Financial Dashboard UI",
    role: "Frontend Engineer",
    type: "Frontend",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    impact: "100% Lighthouse",
    oneLiner:
      "Developed a buttery-smooth client interface for complex financial telemetry.",
    challenge:
      "Rendering thousands of dynamic data points on a single view without dropping frame rates or overwhelming the user cognitively.",
    solution:
      "Used virtualization for long lists and CSS-transform based animations (avoiding layout shifts) to guarantee 60fps scrolling while keeping the bundle size microscopic.",
    codeSnippet: `<VirtualList
  width={800}
  height={600}
  itemCount={10000}
  itemSize={35}
  renderItem={({ index, style }) => (
    <TransactionRow 
      data={transactions[index]} 
      style={style} 
    />
  )}
/>`,
  },
];

const TYPE_FILTERS = ["All", "Backend", "Full Stack", "Frontend"] as const;
type Filter = (typeof TYPE_FILTERS)[number];

const typeBadgeClass: Record<SystemType, string> = {
  Backend: "border-brand-highlight/50 text-brand-highlight",
  "Full Stack": "border-teal-400/50 text-teal-400",
  Frontend: "border-emerald-400/50 text-emerald-400",
};

export function SelectedSystems() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered =
    activeFilter === "All"
      ? systems
      : systems.filter((s) => s.type === activeFilter);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: "easeInOut" as const };

  return (
    <Section
      id="selected-systems"
      className="relative border-t border-brand-text/10 bg-brand-base">
      <Container>
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brand-text/10 pb-8">
          <motion.div
            {...fadeUp}
            viewport={defaultViewport}
            whileInView={fadeUp.animate}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }
            }>
            <h2 className="text-sm font-mono tracking-widest text-brand-highlight uppercase mb-4">
              Portfólio Curado
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text">
              Selected Systems
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={defaultViewport}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 0.2 }
            }
            className="font-mono text-brand-text/60 text-sm hidden md:block text-right">
            ────────●────────●────────●────────
            <br />
            SQL → Full Stack → Distributed
          </motion.p>
        </div>

        {/* Filter tabs */}
        <div className="mb-10 flex gap-2 flex-wrap">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                setExpandedId(null);
              }}
              className={`cursor-pointer font-mono text-xs px-4 py-2 border transition-colors ${
                activeFilter === f
                  ? "border-brand-highlight bg-brand-highlight/10 text-brand-highlight"
                  : "border-brand-text/20 text-brand-text/50 hover:border-brand-text/40 hover:text-brand-text/80"
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Dossier List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((sys, idx) => {
              const isExpanded = expandedId === sys.id;
              return (
                <motion.div
                  key={sys.id}
                  layout
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.4, delay: idx * 0.07 }
                  }
                  className="group border border-brand-text/10 bg-brand-base">
                  {/* Header Row */}
                  <div
                    className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer hover:bg-brand-highlight/5 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : sys.id)}>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="flex flex-col md:flex-row md:items-center items-start gap-4">
                        <h4 className="text-2xl font-bold text-brand-text group-hover:text-brand-highlight transition-colors">
                          {sys.title}
                        </h4>
                        <span
                          className={`font-mono text-xs inline-flex items-center justify-center text-center border px-3 py-1 rounded-full ${typeBadgeClass[sys.type]}`}>
                          {sys.type}
                        </span>
                      </div>
                      <p className="text-brand-text/80 leading-relaxed font-mono text-sm max-w-2xl">
                        {sys.oneLiner}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sys.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs text-brand-text/60 bg-brand-text/5 px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-48 shrink-0 flex md:flex-col justify-between w-full md:w-auto items-center md:items-end gap-4">
                      <div className="text-right">
                        <span className="block text-brand-text/50 font-mono text-xs uppercase mb-1">
                          Impact
                        </span>
                        <span className="text-brand-metric font-mono text-lg">
                          {sys.impact}
                        </span>
                      </div>
                      <button className="cursor-pointer font-mono text-xs text-brand-highlight/70 group-hover:text-brand-highlight border border-brand-highlight/20 px-3 py-1.5 rounded-sm transition-colors">
                        {isExpanded ? "Close Dossier" : "Open Dossier"}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Dossier */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={transition}
                        className="overflow-hidden border-t border-brand-text/10 bg-brand-highlight/5">
                        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div className="space-y-8 font-mono text-sm">
                            <div>
                              <h5 className="text-brand-text/50 uppercase tracking-widest mb-3 text-xs">
                                The Challenge
                              </h5>
                              <p className="text-brand-text/90 leading-relaxed">
                                {sys.challenge}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-brand-text/50 uppercase tracking-widest mb-3 text-xs">
                                The Solution
                              </h5>
                              <p className="text-brand-text/90 leading-relaxed">
                                {sys.solution}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            {sys.codeSnippet && (
                              <CodeSnippet
                                code={sys.codeSnippet}
                                language={
                                  sys.type === "Backend" ? "sql" : "typescript"
                                }
                                className="shadow-2xl w-full"
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="font-mono text-sm text-brand-text/40 py-12 text-center">
              No systems match this filter.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
