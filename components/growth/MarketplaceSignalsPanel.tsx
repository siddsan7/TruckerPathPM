import { cn } from "@/lib/cn";
import { marketplaceSignals } from "@/lib/growth/mock-data";

export function MarketplaceSignalsPanel() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Marketplace integrations</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Signals powering recommendation quality</h2>
          <p className="mt-1 text-sm text-slate-500">All cards are mocked locally, but shaped like partner-health surfaces a PM would monitor.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {marketplaceSignals.map((signal) => (
          <article key={signal.id} className="rounded-[22px] border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-950">{signal.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{signal.category.replace("_", " ")}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  signal.status === "connected"
                    ? "bg-emerald-50 text-emerald-700"
                    : signal.status === "degraded"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-700",
                )}
              >
                {signal.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-5 text-slate-600">{signal.impact}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{signal.freshness}</span>
                <span>{signal.confidence}% confidence</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${signal.confidence}%` }} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
