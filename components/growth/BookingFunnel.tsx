import { ArrowDownRight } from "lucide-react";
import { bookingFunnel } from "@/lib/growth/mock-data";

export function BookingFunnel() {
  const first = bookingFunnel[0]?.count ?? 1;
  const rows = bookingFunnel.map((item, index) => {
    const previous = bookingFunnel[index - 1]?.count ?? item.count;
    const stageConversion = Math.round((item.count / previous) * 100);
    const overallConversion = Math.round((item.count / first) * 100);
    const drop = index === 0 ? 0 : previous - item.count;
    return { ...item, stageConversion, overallConversion, drop };
  });
  const biggestDrop = rows.slice(1).sort((left, right) => right.drop - left.drop)[0];

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Booking funnel simulator</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Activation to confirmed booking</h2>
          <p className="mt-1 text-sm text-slate-500">Mock counts show where product experiments can unlock conversion.</p>
        </div>
        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">Largest drop: {biggestDrop.stage}</span>
      </div>

      <div className="mt-5 space-y-3">
        {rows.map((row, index) => (
          <div key={row.stage} className="grid gap-3 rounded-[20px] border border-slate-200 p-3 md:grid-cols-[220px_minmax(0,1fr)_160px] md:items-center">
            <div>
              <div className="text-sm font-semibold text-slate-950">{row.stage}</div>
              <div className="mt-0.5 text-xs text-slate-500">{row.count.toLocaleString()} drivers</div>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${row.overallConversion}%` }} />
            </div>
            <div className="text-sm text-slate-600">
              {index === 0 ? "Baseline" : `${row.stageConversion}% from previous`} / {row.overallConversion}% overall
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[22px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <div className="flex items-center gap-2 font-semibold">
          <ArrowDownRight className="h-4 w-4" />
          Largest drop-off: Load saved {"->"} Booking requested.
        </div>
        <p className="mt-1">
          Potential cause: drivers may not trust gross payout or risk visibility. Suggested experiment: show estimated net profit and parking risk
          directly on load cards.
        </p>
      </div>
    </section>
  );
}
