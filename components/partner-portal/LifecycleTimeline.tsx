import { lifecycleEvents } from "@/lib/partner-portal/mock-data";
import { StatusBadge } from "./StatusBadge";

export function LifecycleTimeline() {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-semibold text-slate-950">Lifecycle timeline</h2>
      <div className="mt-4 space-y-3">
        {lifecycleEvents.map((event) => (
          <div key={event.label} className="grid gap-3 rounded-[18px] border border-slate-200 p-3 md:grid-cols-[1fr_150px_130px] md:items-center">
            <div>
              <div className="font-semibold text-slate-950">{event.label}</div>
              <div className="mt-0.5 text-sm text-slate-500">Owner: {event.owner}</div>
            </div>
            <StatusBadge status={event.status} />
            <div className="text-sm text-slate-500">{event.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
