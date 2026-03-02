"use client";

import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
}

/** CSS-only keyword tokens — no runtime library needed */
const languageTokens: Record<string, { keywords: string[]; color: string }[]> =
  {
    sql: [
      {
        keywords: [
          "WITH",
          "SELECT",
          "FROM",
          "WHERE",
          "GROUP BY",
          "AS",
          "IN",
          "AND",
          "OR",
          "JOIN",
          "ON",
          "ORDER BY",
          "LIMIT",
          "HAVING",
          "SUM",
          "COUNT",
          "AVG",
          "date_trunc",
        ],
        color: "#38BDF8",
      },
      { keywords: ["--"], color: "#52525B" },
    ],
    typescript: [
      {
        keywords: [
          "const",
          "let",
          "var",
          "async",
          "await",
          "new",
          "return",
          "import",
          "export",
          "default",
          "from",
          "if",
          "else",
          "function",
          "class",
          "interface",
          "type",
        ],
        color: "#38BDF8",
      },
      { keywords: ["//"], color: "#52525B" },
    ],
  };

function tokenize(code: string, language: string): React.ReactNode[] {
  const config = languageTokens[language] ?? [];
  const lines = code.split("\n");

  return lines.map((line, li) => {
    // Find the first matching group
    for (const { keywords, color } of config) {
      for (const kw of keywords) {
        if (line.trimStart().startsWith(kw)) {
          return (
            <span key={li} style={{ color }} className="block">
              {line}
            </span>
          );
        }
        if (line.includes(kw + " ") || line.includes(kw + "(")) {
          // Partial inline keyword highlight
        }
      }
    }
    return (
      <span key={li} className="block text-brand-text/75">
        {line}
      </span>
    );
  });
}

export function CodeSnippet({
  code,
  language = "typescript",
  className,
}: CodeSnippetProps) {
  const tokens = tokenize(code, language.toLowerCase());

  return (
    <div
      className={cn(
        "w-full rounded-md overflow-hidden border border-brand-text/10 bg-[#090C10] flex flex-col font-mono text-xs",
        className,
      )}>
      {/* Mock Editor Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-brand-text/10 bg-brand-text/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/15"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/15"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/15"></div>
        </div>
        <div className="ml-2 text-brand-text/30 lowercase tracking-wide">
          system.{language.toLowerCase()}
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto leading-relaxed">{tokens}</div>
    </div>
  );
}
