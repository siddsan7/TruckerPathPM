"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { marketplaceLoads } from "@/lib/growth/mock-data";
import { scoreMarketplaceLoad } from "@/lib/growth/scoring";
import type { DriverGrowthProfile, MarketplaceLoad } from "@/lib/growth/types";
import { LoadCard } from "./LoadCard";
import { LoadDetailPanel } from "./LoadDetailPanel";

type SortMode = "recommended" | "net" | "risk" | "return" | "hos";

type Props = {
  profile: DriverGrowthProfile;
  savedLoadIds: string[];
  requestedLoadIds: string[];
  onToggleSaved: (loadId: string) => void;
  onRequestBooking: (loadId: string) => void;
};

const sortModes: Array<{ id: SortMode; label: string }> = [
  { id: "recommended", label: "Recommended" },
  { id: "net", label: "Highest Net" },
  { id: "risk", label: "Lowest Risk" },
  { id: "return", label: "Return Load Likely" },
  { id: "hos", label: "HOS Safe" },
];

export function LoadDiscoveryPanel({ profile, savedLoadIds, requestedLoadIds, onToggleSaved, onRequestBooking }: Props) {
  const [sortMode, setSortMode] = useState<SortMode>("recommended");
  const [selectedLoadId, setSelectedLoadId] = useState(marketplaceLoads[0]?.id ?? "");

  const scoredLoads = useMemo(() => {
    const rows = marketplaceLoads.map((load) => ({ load, score: scoreMarketplaceLoad(load, profile) }));
    return rows.sort((left, right) => {
      if (sortMode === "net") return right.score.estimatedNetProfit - left.score.estimatedNetProfit;
      if (sortMode === "risk") return right.score.riskScore + right.score.parkingScore - (left.score.riskScore + left.score.parkingScore);
      if (sortMode === "return") return right.load.returnLoadProbability - left.load.returnLoadProbability;
      if (sortMode === "hos") return Number(right.load.hosFeasible) - Number(left.load.hosFeasible) || right.score.total - left.score.total;
      return right.score.total - left.score.total;
    });
  }, [profile, sortMode]);

  const selected = scoredLoads.find((row) => row.load.id === selectedLoadId) ?? scoredLoads[0];

  function toggleSelected(load: MarketplaceLoad) {
    setSelectedLoadId(load.id);
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">AI-scored load discovery</div>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">Ranked by true marketplace value</h2>
            <p className="mt-1 text-sm text-slate-500">
              LoadPilot Score blends net profit, rate, deadhead, HOS, parking, broker, return-load, and risk signals.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{scoredLoads.length} demo loads</span>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {sortModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSortMode(mode.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                sortMode === mode.id ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300",
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {scoredLoads.map(({ load, score }) => (
            <LoadCard
              key={load.id}
              load={load}
              score={score}
              active={selected.load.id === load.id}
              saved={savedLoadIds.includes(load.id)}
              onSelect={() => toggleSelected(load)}
              onSave={() => onToggleSaved(load.id)}
            />
          ))}
        </div>
      </div>

      <LoadDetailPanel
        load={selected.load}
        score={selected.score}
        saved={savedLoadIds.includes(selected.load.id)}
        requested={requestedLoadIds.includes(selected.load.id)}
        onSave={() => onToggleSaved(selected.load.id)}
        onRequestBooking={() => onRequestBooking(selected.load.id)}
      />
    </section>
  );
}
