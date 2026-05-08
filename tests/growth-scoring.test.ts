import { describe, expect, it } from "vitest";
import { defaultDriverGrowthProfile, marketplaceLoads } from "../lib/growth/mock-data";
import { estimateLoadNetProfit, scoreMarketplaceLoad } from "../lib/growth/scoring";
import type { MarketplaceLoad } from "../lib/growth/types";

const baseLoad = marketplaceLoads[0] as MarketplaceLoad;

describe("LoadPilot marketplace scoring", () => {
  it("keeps total score within bounds", () => {
    for (const load of marketplaceLoads) {
      const score = scoreMarketplaceLoad(load, defaultDriverGrowthProfile);
      expect(score.total).toBeGreaterThanOrEqual(0);
      expect(score.total).toBeLessThanOrEqual(100);
    }
  });

  it("scores profitable HOS-safe loads higher", () => {
    const safeScore = scoreMarketplaceLoad(baseLoad, defaultDriverGrowthProfile);
    const unsafeScore = scoreMarketplaceLoad(
      { ...baseLoad, hosFeasible: false, payout: 950, estimatedFuelCost: 500 },
      defaultDriverGrowthProfile,
    );

    expect(safeScore.total).toBeGreaterThan(unsafeScore.total);
    expect(unsafeScore.hosScore).toBeLessThan(15);
  });

  it("penalizes loads with excessive deadhead", () => {
    const normal = scoreMarketplaceLoad(baseLoad, defaultDriverGrowthProfile);
    const excessive = scoreMarketplaceLoad(
      { ...baseLoad, deadheadMiles: defaultDriverGrowthProfile.maxDeadheadMiles + 220 },
      defaultDriverGrowthProfile,
    );

    expect(excessive.deadheadScore).toBeLessThan(normal.deadheadScore);
    expect(excessive.total).toBeLessThan(normal.total);
  });

  it("rewards high broker reliability", () => {
    const lowBroker = scoreMarketplaceLoad({ ...baseLoad, brokerReliability: 52 }, defaultDriverGrowthProfile);
    const highBroker = scoreMarketplaceLoad({ ...baseLoad, brokerReliability: 96 }, defaultDriverGrowthProfile);

    expect(highBroker.brokerScore).toBeGreaterThan(lowBroker.brokerScore);
    expect(highBroker.total).toBeGreaterThan(lowBroker.total);
  });

  it("penalizes high parking risk when tolerance is not high", () => {
    const lowRisk = scoreMarketplaceLoad({ ...baseLoad, parkingRisk: "low" }, defaultDriverGrowthProfile);
    const highRisk = scoreMarketplaceLoad({ ...baseLoad, parkingRisk: "high" }, defaultDriverGrowthProfile);

    expect(highRisk.parkingScore).toBeLessThan(lowRisk.parkingScore);
    expect(highRisk.risks.some((risk) => risk.includes("Parking risk is high"))).toBe(true);
  });

  it("calculates estimated net profit from payout, fuel, and deadhead", () => {
    const load = { ...baseLoad, payout: 2000, estimatedFuelCost: 400, deadheadMiles: 100 };

    expect(estimateLoadNetProfit(load)).toBe(1455);
    expect(scoreMarketplaceLoad(load, defaultDriverGrowthProfile).estimatedNetProfit).toBe(1455);
  });

  it("returns reasons and risks for each load", () => {
    const score = scoreMarketplaceLoad(marketplaceLoads[2] as MarketplaceLoad, defaultDriverGrowthProfile);

    expect(score.reasons.length).toBeGreaterThan(0);
    expect(score.risks.length).toBeGreaterThan(0);
  });
});
