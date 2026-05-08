"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { growthExperiments } from "@/lib/growth/mock-data";
import type { ExperimentStatus } from "@/lib/growth/types";

const storageKey = "growth:experimentStatuses";
const statuses: ExperimentStatus[] = ["queued", "designing", "running", "shipped"];

export function ExperimentBacklog() {
  const [statusById, setStatusById] = useState<Record<string, ExperimentStatus>>({});

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setStatusById(JSON.parse(stored) as Record<string, ExperimentStatus>);
    } catch {
      // Ignore local storage issues in demo mode.
    }
  }, []);

  function updateStatus(id: string, status: ExperimentStatus) {
    const next = { ...statusById, [id]: status };
    setStatusById(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    if (process.env.NODE_ENV === "development") console.info("growth analytics", "experiment_viewed");
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Experiment backlog</div>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">Activation, conversion, and retention bets</h2>
        <p className="mt-1 text-sm text-slate-500">Prioritized growth experiments with PM-facing hypotheses and measurable targets.</p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {growthExperiments.map((experiment) => {
          const currentStatus = statusById[experiment.id] ?? experiment.status;
          return (
            <article key={experiment.id} className="rounded-[22px] border border-slate-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-950">{experiment.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{experiment.hypothesis}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{experiment.target}</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                <Fact label="Audience" value={experiment.audience} />
                <Fact label="Treatment" value={experiment.treatment} />
                <Fact label="Primary metric" value={experiment.primaryMetric} />
                <Fact label="Risk" value={experiment.risk} />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Effort {experiment.effort}</span>
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(experiment.id, status)}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-semibold",
                        currentStatus === status ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 text-slate-600 hover:border-blue-300",
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-slate-50 p-3">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-sm text-slate-800">{value}</div>
    </div>
  );
}
