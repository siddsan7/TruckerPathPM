"use client";

import { Bookmark, Clock, Fuel, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LoadScoreBreakdown, MarketplaceLoad } from "@/lib/growth/types";

type Props = {
  load: MarketplaceLoad;
  score: LoadScoreBreakdown;
  active: boolean;
  saved: boolean;
  onSelect: () => void;
  onSave: () => void;
};

function riskTone(risk: "low" | "medium" | "high") {
  if (risk === "low") return "bg-emerald-50 text-emerald-700";
  if (risk === "medium") return "bg-amber-50 text-amber-700";
  return "bg-rose-50 text-rose-700";
}

export function LoadCard({ load, score, active, saved, onSelect, onSave }: Props) {
  return (
    <article
      className={cn(
        "rounded-[22px] border bg-white p-4 transition",
        active ? "border-blue-500 shadow-[0_16px_40px_rgba(37,99,235,0.12)]" : "border-slate-200 hover:border-blue-300",
      )}
    >
      <button data-testid={`load-card-${load.id}`} onClick={onSelect} className="block w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-950">
              {load.pickupCity}, {load.pickupState} {"->"} {load.dropoffCity}, {load.dropoffState}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {load.id} / {load.equipment} / {load.pickupWindow}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-950 px-3 py-2 text-center text-white">
            <div className="text-lg font-semibold leading-none">{score.total}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-300">Score</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
          <Metric label="Payout" value={`$${load.payout.toLocaleString()}`} />
          <Metric label="Net est." value={`$${score.estimatedNetProfit.toLocaleString()}`} />
          <Metric label="RPM" value={`$${score.ratePerMile.toFixed(2)}`} />
          <Metric label="Deadhead" value={`${load.deadheadMiles} mi`} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", riskTone(load.parkingRisk))}>Parking {load.parkingRisk}</span>
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", load.hosFeasible ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
            HOS {load.hosFeasible ? "safe" : "risk"}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">Broker {load.brokerReliability}</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">Return {load.returnLoadProbability}%</span>
        </div>
      </button>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" /> ${load.estimatedFuelCost}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {load.dropoffWindow}
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> risk {score.riskScore}
          </span>
        </div>
        <button onClick={onSave} className={cn("btn-outline px-2.5 py-1.5 text-xs", saved && "border-blue-200 bg-blue-50 text-blue-700")}>
          <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-current")} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-2">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="mt-0.5 font-semibold text-slate-950">{value}</div>
    </div>
  );
}
