"use client";

import { useEffect, useState } from "react";
import { IconRail } from "@/components/icon-rail";
import { TopHeader } from "@/components/top-header";
import { BookingFunnel } from "@/components/growth/BookingFunnel";
import { DriverOnboardingCard } from "@/components/growth/DriverOnboardingCard";
import { ExperimentBacklog } from "@/components/growth/ExperimentBacklog";
import { GrowthHeader } from "@/components/growth/GrowthHeader";
import { GrowthKpiStrip } from "@/components/growth/GrowthKpiStrip";
import { LoadDiscoveryPanel } from "@/components/growth/LoadDiscoveryPanel";
import { MarketplaceSignalsPanel } from "@/components/growth/MarketplaceSignalsPanel";
import { PmCopilotPanel } from "@/components/growth/PmCopilotPanel";
import { defaultDriverGrowthProfile } from "@/lib/growth/mock-data";
import type { DriverGrowthProfile } from "@/lib/growth/types";

const profileKey = "growth:selectedDriverProfile";
const savedLoadsKey = "growth:savedLoads";
const requestedLoadsKey = "growth:requestedLoads";

export default function GrowthPage() {
  const [profile, setProfile] = useState<DriverGrowthProfile>(defaultDriverGrowthProfile);
  const [savedLoadIds, setSavedLoadIds] = useState<string[]>([]);
  const [requestedLoadIds, setRequestedLoadIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedProfile = window.localStorage.getItem(profileKey);
      const storedSaved = window.localStorage.getItem(savedLoadsKey);
      const storedRequested = window.localStorage.getItem(requestedLoadsKey);
      if (storedProfile) setProfile(JSON.parse(storedProfile) as DriverGrowthProfile);
      if (storedSaved) setSavedLoadIds(JSON.parse(storedSaved) as string[]);
      if (storedRequested) setRequestedLoadIds(JSON.parse(storedRequested) as string[]);
      if (process.env.NODE_ENV === "development") console.info("growth analytics", "growth_page_viewed");
    } catch {
      // Local storage is optional for the demo.
    }
  }, []);

  function updateProfile(next: DriverGrowthProfile) {
    setProfile(next);
    window.localStorage.setItem(profileKey, JSON.stringify(next));
    if (process.env.NODE_ENV === "development") console.info("growth analytics", "onboarding_completed");
  }

  function toggleSaved(loadId: string) {
    setSavedLoadIds((current) => {
      const next = current.includes(loadId) ? current.filter((id) => id !== loadId) : [...current, loadId];
      window.localStorage.setItem(savedLoadsKey, JSON.stringify(next));
      if (process.env.NODE_ENV === "development") console.info("growth analytics", "load_saved", loadId);
      return next;
    });
  }

  function requestBooking(loadId: string) {
    setRequestedLoadIds((current) => {
      const next = current.includes(loadId) ? current : [...current, loadId];
      window.localStorage.setItem(requestedLoadsKey, JSON.stringify(next));
      if (process.env.NODE_ENV === "development") console.info("growth analytics", "booking_requested", loadId);
      return next;
    });
    if (!savedLoadIds.includes(loadId)) toggleSaved(loadId);
  }

  return (
    <div className="flex h-screen flex-col">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <IconRail />
        <main className="flex-1 overflow-auto bg-[#f5f6f8] p-6">
          <div className="mx-auto max-w-[1500px] space-y-5">
            <GrowthHeader />
            <GrowthKpiStrip />
            <DriverOnboardingCard profile={profile} onChange={updateProfile} />
            <LoadDiscoveryPanel
              profile={profile}
              savedLoadIds={savedLoadIds}
              requestedLoadIds={requestedLoadIds}
              onToggleSaved={toggleSaved}
              onRequestBooking={requestBooking}
            />
            <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
              <BookingFunnel />
              <MarketplaceSignalsPanel />
            </div>
            <PmCopilotPanel />
            <ExperimentBacklog />
          </div>
        </main>
      </div>
    </div>
  );
}
