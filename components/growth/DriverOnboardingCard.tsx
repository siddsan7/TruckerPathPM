"use client";

import type { DriverGrowthProfile, RiskLevel, TruckType } from "@/lib/growth/types";

type Props = {
  profile: DriverGrowthProfile;
  onChange: (profile: DriverGrowthProfile) => void;
};

const trucks: TruckType[] = ["Dry Van", "Reefer", "Flatbed"];
const risks: RiskLevel[] = ["low", "medium", "high"];

export function DriverOnboardingCard({ profile, onChange }: Props) {
  function update<K extends keyof DriverGrowthProfile>(key: K, value: DriverGrowthProfile[K]) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Driver onboarding</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Preference capture snapshot</h2>
          <p className="mt-1 text-sm text-slate-500">
            These demo inputs personalize scoring without needing auth, live APIs, or migrations.
          </p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Activation lever</span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Driver name</span>
          <input className="input" value={profile.name} onChange={(event) => update("name", event.target.value)} />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Home base</span>
          <input className="input" value={profile.homeBase} onChange={(event) => update("homeBase", event.target.value)} />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Truck type</span>
          <select className="input" value={profile.truckType} onChange={(event) => update("truckType", event.target.value as TruckType)}>
            {trucks.map((truck) => (
              <option key={truck}>{truck}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Preferred trip length</span>
          <select
            className="input"
            value={profile.preferredTripLength}
            onChange={(event) => update("preferredTripLength", event.target.value as DriverGrowthProfile["preferredTripLength"])}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">HOS remaining</span>
          <input
            className="input"
            type="number"
            min="0"
            step="0.5"
            value={profile.hoursRemaining}
            onChange={(event) => update("hoursRemaining", Number(event.target.value))}
          />
          <span className="block text-xs text-slate-500">Used to sharply penalize infeasible recommendations.</span>
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Max deadhead miles</span>
          <input
            className="input"
            type="number"
            min="0"
            value={profile.maxDeadheadMiles}
            onChange={(event) => update("maxDeadheadMiles", Number(event.target.value))}
          />
          <span className="block text-xs text-slate-500">Deadhead above this limit reduces the LoadPilot score.</span>
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Minimum rate per mile</span>
          <input
            className="input"
            type="number"
            min="0"
            step="0.05"
            value={profile.minRatePerMile}
            onChange={(event) => update("minRatePerMile", Number(event.target.value))}
          />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Preferred regions</span>
          <input
            className="input"
            value={profile.preferredRegions.join(", ")}
            onChange={(event) =>
              update(
                "preferredRegions",
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Fuel sensitivity</span>
          <select className="input" value={profile.fuelSensitivity} onChange={(event) => update("fuelSensitivity", event.target.value as RiskLevel)}>
            {risks.map((risk) => (
              <option key={risk}>{risk}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Parking risk tolerance</span>
          <select
            className="input"
            value={profile.parkingRiskTolerance}
            onChange={(event) => update("parkingRiskTolerance", event.target.value as RiskLevel)}
          >
            {risks.map((risk) => (
              <option key={risk}>{risk}</option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
