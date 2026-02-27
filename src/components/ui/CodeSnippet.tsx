"use client";

import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeSnippet({
  code,
  language = "typescript",
  className,
}: CodeSnippetProps) {
  return (
    <div
      className={cn(
        "w-full rounded-md overflow-hidden border border-brand-text/10 bg-brand-base/50 flex flex-col font-mono text-xs",
        className,
      )}>
      {/* Mock Editor Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-brand-text/10 bg-brand-text/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/20"></div>
        </div>
        <div className="ml-2 text-brand-text/40 lowercase">
          system.{language}
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-brand-text/70 leading-relaxed whitespace-pre">
        {code}
      </div>
    </div>
  );
}
