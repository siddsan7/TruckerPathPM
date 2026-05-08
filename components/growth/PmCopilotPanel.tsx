"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { driverFeedback } from "@/lib/growth/mock-data";
import { fallbackPmCopilotOutput } from "@/lib/growth/insights";
import type { PmCopilotOutput } from "@/lib/growth/types";

const storageKey = "growth:pmCopilotOutput";

export function PmCopilotPanel() {
  const [selected, setSelected] = useState(driverFeedback);
  const [output, setOutput] = useState<PmCopilotOutput>(fallbackPmCopilotOutput);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setOutput(JSON.parse(stored) as PmCopilotOutput);
    } catch {
      // Ignore local storage issues in demo mode.
    }
  }, []);

  async function generate() {
    setLoading(true);
    try {
      const response = await fetch("/api/growth-insights", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ feedback: selected }),
      });
      const next = (await response.json()) as PmCopilotOutput;
      setOutput(next);
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      if (process.env.NODE_ENV === "development") console.info("growth analytics", "pm_copilot_generated");
    } catch {
      setOutput(fallbackPmCopilotOutput);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">PM Copilot</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Feedback synthesis, experiments, and PRD draft</h2>
          <p className="mt-1 text-sm text-slate-500">Gemini is optional. If it is not configured, the deterministic PM brief still works.</p>
        </div>
        <button data-testid="pm-copilot-generate" onClick={generate} className="btn-primary" disabled={loading}>
          <Sparkles className="h-4 w-4" />
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-2">
          {driverFeedback.map((feedback) => {
            const active = selected.includes(feedback);
            return (
              <button
                key={feedback}
                onClick={() =>
                  setSelected((current) =>
                    active ? current.filter((item) => item !== feedback) : [...current, feedback],
                  )
                }
                className={`w-full rounded-[18px] border p-3 text-left text-sm leading-5 transition ${
                  active ? "border-blue-300 bg-blue-50 text-blue-950" : "border-slate-200 text-slate-600 hover:border-blue-200"
                }`}
              >
                {feedback}
              </button>
            );
          })}
        </div>

        <div data-testid="pm-copilot-panel" className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-950">Generated PM brief</h3>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{output.source ?? "fallback"}</span>
          </div>
          <Brief label="Top insight" value={output.topInsight} />
          <Brief label="Pain point" value={output.userPainPoint} />
          <Brief label="Suggested experiment" value={output.suggestedExperiment} />
          <Brief label="Hypothesis" value={output.hypothesis} />
          <Brief label="Primary metric" value={output.primaryMetric} />
          <div className="mt-4">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Secondary metrics</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {output.secondaryMetrics.map((metric) => (
                <span key={metric} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  {metric}
                </span>
              ))}
            </div>
          </div>
          <Brief label="PRD draft" value={output.prdDraft} />
        </div>
      </div>
    </section>
  );
}

function Brief({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}
