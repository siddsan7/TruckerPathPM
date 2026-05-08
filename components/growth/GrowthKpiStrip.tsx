import { TrendingUp } from "lucide-react";
import { growthKpis } from "@/lib/growth/mock-data";

export function GrowthKpiStrip() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Growth KPI strip">
      {growthKpis.map((kpi) => (
        <article key={kpi.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_16px_44px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium text-slate-500">{kpi.label}</div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              {kpi.trend}
            </span>
          </div>
          <div className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{kpi.value}</div>
          <p className="mt-3 text-sm leading-5 text-slate-500">{kpi.explanation}</p>
        </article>
      ))}
    </section>
  );
}
