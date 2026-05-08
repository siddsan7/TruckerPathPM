"use client";

import { CheckCircle2, ClipboardCheck, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LoadScoreBreakdown, MarketplaceLoad } from "@/lib/growth/types";

type Props = {
  load: MarketplaceLoad;
  score: LoadScoreBreakdown;
  saved: boolean;
  requested: boolean;
  onSave: () => void;
  onRequestBooking: () => void;
};

export function LoadDetailPanel({ load, score, saved, requested, onSave, onRequestBooking }: Props) {
  const breakdown = [
    ["Net profit", score.netProfitScore],
    ["Rate/mile", score.ratePerMileScore],
    ["Deadhead fit", score.deadheadScore],
    ["HOS", score.hosScore],
    ["Parking", score.parkingScore],
    ["Broker", score.brokerScore],
    ["Return load", score.returnLoadScore],
    ["Risk", score.riskScore],
  ] as const;

  return (
    <aside data-testid="load-detail-panel" className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Load detail explanation</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Why this load?</h2>
          <p className="mt-1 text-sm text-slate-500">
            {load.pickupCity}, {load.pickupState} {"->"} {load.dropoffCity}, {load.dropoffState}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-white">
          <div className="text-2xl font-semibold leading-none">{score.total}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-300">LoadPilot</div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Info label="Estimated net" value={`$${score.estimatedNetProfit.toLocaleString()}`} />
        <Info label="Rate per mile" value={`$${score.ratePerMile.toFixed(2)}`} />
        <Info label="Return probability" value={`${load.returnLoadProbability}%`} />
      </div>

      <div className="mt-5 space-y-3">
        {breakdown.map(([label, value]) => (
          <div key={label}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{label}</span>
              <span className="text-slate-500">{value}/100</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <section className="rounded-[20px] border border-emerald-100 bg-emerald-50/60 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <CheckCircle2 className="h-4 w-4" />
            Positive signals
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-emerald-900">
            {score.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-[20px] border border-amber-100 bg-amber-50/70 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <TriangleAlert className="h-4 w-4" />
            Risks and tradeoffs
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-amber-950">
            {score.risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={onSave} className={cn("btn-outline", saved && "border-blue-200 bg-blue-50 text-blue-700")}>
          {saved ? "Saved load" : "Save load"}
        </button>
        <button data-testid="request-booking" onClick={onRequestBooking} className={cn("btn-primary", requested && "bg-emerald-600 hover:bg-emerald-700")}>
          <ClipboardCheck className="h-4 w-4" />
          {requested ? "Booking requested" : "Request booking"}
        </button>
      </div>
    </aside>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-slate-200 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-950">{value}</div>
    </div>
  );
}
