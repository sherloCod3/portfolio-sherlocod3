"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { fadeUp, defaultViewport } from "@/lib/motion";

type SystemType = "Backend" | "Full Stack" | "Frontend" | "Data / Desktop";

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
    title: "Reporting Platform Prototype",
    role: "Full Stack Developer",
    type: "Full Stack",
    tags: ["Node.js", "TypeScript", "React", "Puppeteer"],
    impact: "Self-hosted Prototype",
    oneLiner: "A secure SQL execution and PDF generation reporting engine.",
    challenge:
      "Enterprise reporting requires a secure environment for SQL execution, robust query validation, and reliable generation of PDF exports without overwhelming the server.",
    solution:
      "Built an AST-based SQL parser for deep query validation, and orchestrated a Puppeteer browser pool to handle PDF exports in background workers.",
    codeSnippet: `const parsed = parseSql(query);
if (!isSelect(parsed) || hasForbiddenKeywords(parsed)) {
  throw new ValidationError("Only SELECT queries allowed.");
}
const result = await db.query(query);
const pdfBuffer = await pdfPool.renderToStream(result);`,
  },
  {
    id: "sys-02",
    title: "Plataforma de Conexão Social",
    role: "Frontend Developer",
    type: "Frontend",
    tags: ["React.js", "SCSS", "Responsive Design"],
    impact: "Modern UX Accessibility",
    oneLiner:
      "Custom responsive platform bridging volunteers to social initiatives.",
    challenge:
      "A platform to give visibility to social projects required a modern, accessible interface without utilizing any existing UI framework libraries (e.g. Tailwind, Bootstrap).",
    solution:
      "Developed a fully responsive layout from scratch using modular SCSS and React components, maintaining strict visual hierarchy and accessibility standards.",
    codeSnippet: `@mixin responsive-layout($breakpoint) {
  @media (max-width: $breakpoint) {
    flex-direction: column;
    padding: map-get($spacing, 'mobile');
  }
}

.card-projeto {
  @include responsive-layout($tablet);
  transition: transform 0.3s ease;
}`,
  },
  {
    id: "sys-03",
    title: "Excel Editor GUI",
    role: "Python Developer",
    type: "Data / Desktop",
    tags: ["Python", "Pandas", "Tkinter", "ETL"],
    impact: "No-code Data Transforms",
    oneLiner:
      "A desktop GUI exposing Pandas functionality to non-technical users.",
    challenge:
      "Non-technical users struggled with complex Excel formulas for data transformation tasks like pivots, merges, data cleaning, and dataset consolidations.",
    solution:
      "Created a desktop GUI mapping powerful Pandas dataframe operations to intuitive visual controls, enabling complex ETL operations with just a few clicks.",
    codeSnippet: `def execute_merge(self, df1, df2, how='inner', on_col='ID'):
    """
    Pandas backend exposed via Tkinter UI for non-devs.
    """
    merged = pd.merge(df1, df2, how=how, on=on_col)
    
    # Safely update the pandastable view
    self.data_view.update_table(merged)
    return merged`,
  },
  {
    id: "sys-04",
    title: "Health Data Analytics",
    role: "Backend Engineer",
    type: "Backend",
    tags: ["Java", "Spring Boot", "PostgreSQL", "ETL"],
    impact: "303k → 792 records",
    oneLiner:
      "ETL pipeline and REST API for processing health operator expenses.",
    challenge:
      "Processing and validating a massive dataset of public National Agency for Supplementary Health (ANS) data required heavy processing and data normalization.",
    solution:
      "Implemented a high-performance ETL pipeline in Java, processing CSVs efficiently with stream reduction, logging pipeline stages, and strict CNPJ validation.",
    codeSnippet: `public void processQuarterlyData(MultipartFile file) {
    try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(file.getInputStream()))) {
            
        List<OperatorData> batch = csvParser.parse(reader)
            .filter(record -> cnpjValidator.isValid(record.getCnpj()))
            .map(enricherService::enrich)
            .collect(Collectors.toList());
            
        repository.saveAll(batch);
    }
}`,
  },
  {
    id: "sys-05",
    title: "Sistema de Inventário - UPA",
    role: "Full Stack Developer",
    type: "Full Stack",
    tags: ["React", "Express", "MongoDB", "JWT"],
    impact: "Efficient tracking",
    oneLiner: "End-to-end inventory management software for patrimonial goods.",
    challenge:
      "Managing medical supplies and patrimonial goods required a more robust, scalable, and secure tracking software, including data exports and report generation.",
    solution:
      "Developed a full-stack inventory manager featuring advanced paginated views, JWT security, custom alphanumeric code generation, and direct CSV exporting.",
    codeSnippet: `app.get('/api/inventory', verifyJWT, async (req, res) => {
  const { page, category, format } = req.query;
  const items = await InventoryModel.find({ category })
    .skip((page - 1) * limit)
    .limit(limit);
    
  if (format === 'csv') {
    return exportToCsvHandler(items, res);
  }
  
  res.json({ data: items, total: await InventoryModel.countDocuments() });
});`,
  },
];

const TYPE_FILTERS = [
  "All",
  "Backend",
  "Full Stack",
  "Frontend",
  "Data / Desktop",
] as const;
type Filter = (typeof TYPE_FILTERS)[number];

const typeBadgeClass: Record<SystemType, string> = {
  Backend: "border-brand-highlight/50 text-brand-highlight",
  "Full Stack": "border-teal-400/50 text-teal-400",
  Frontend: "border-emerald-400/50 text-emerald-400",
  "Data / Desktop": "border-amber-400/50 text-amber-400",
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

                    <div className="md:w-48 shrink-0 flex md:flex-col justify-between w-full items-center md:items-end gap-4">
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
