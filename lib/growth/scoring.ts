import type {
  DriverGrowthProfile,
  LoadScoreBreakdown,
  MarketplaceLoad,
  RiskLevel,
} from "./types";

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function riskPenaltyScore(risk: RiskLevel): number {
  if (risk === "low") return 100;
  if (risk === "medium") return 70;
  return 35;
}

function parkingFitScore(risk: RiskLevel, tolerance: RiskLevel): number {
  if (risk === "low") return 100;
  if (risk === "medium") return tolerance === "low" ? 58 : 78;
  if (tolerance === "high") return 70;
  if (tolerance === "medium") return 45;
  return 22;
}

export function estimateLoadNetProfit(load: MarketplaceLoad): number {
  return Math.round(load.payout - load.estimatedFuelCost - load.deadheadMiles * 1.45);
}

export function scoreMarketplaceLoad(
  load: MarketplaceLoad,
  profile: DriverGrowthProfile,
): LoadScoreBreakdown {
  const estimatedNetProfit = estimateLoadNetProfit(load);
  const ratePerMile = Number((load.payout / Math.max(load.miles, 1)).toFixed(2));
  const netPerMile = estimatedNetProfit / Math.max(load.miles + load.deadheadMiles, 1);

  const netProfitScore = clamp((netPerMile / Math.max(profile.minRatePerMile, 0.1)) * 82);
  const ratePerMileScore = clamp((ratePerMile / Math.max(profile.minRatePerMile, 0.1)) * 78);
  const deadheadScore =
    load.deadheadMiles <= profile.maxDeadheadMiles
      ? clamp(100 - (load.deadheadMiles / Math.max(profile.maxDeadheadMiles, 1)) * 22)
      : clamp(62 - ((load.deadheadMiles - profile.maxDeadheadMiles) / Math.max(profile.maxDeadheadMiles, 1)) * 70);
  const routeHoursEstimate = load.miles / 55;
  const hosScore = load.hosFeasible
    ? clamp(100 - Math.max(0, routeHoursEstimate - profile.hoursRemaining) * 4)
    : 8;
  const parkingScore = parkingFitScore(load.parkingRisk, profile.parkingRiskTolerance);
  const brokerScore = clamp(load.brokerReliability);
  const returnLoadScore = clamp(load.returnLoadProbability);
  const riskScore = Math.round(
    (riskPenaltyScore(load.documentRisk) + riskPenaltyScore(load.routeRisk)) / 2,
  );

  const equipmentPenalty = load.equipment === profile.truckType ? 0 : 10;
  const fuelPenalty =
    profile.fuelSensitivity === "high" && load.estimatedFuelCost / load.payout > 0.25
      ? 5
      : 0;

  const total = clamp(
    netProfitScore * 0.25 +
      ratePerMileScore * 0.15 +
      deadheadScore * 0.15 +
      hosScore * 0.15 +
      parkingScore * 0.1 +
      brokerScore * 0.1 +
      returnLoadScore * 0.05 +
      riskScore * 0.05 -
      equipmentPenalty -
      fuelPenalty,
  );

  const reasons: string[] = [];
  const risks: string[] = [];

  if (estimatedNetProfit > 1200) reasons.push(`Estimated net profit is $${estimatedNetProfit.toLocaleString()}.`);
  if (ratePerMile >= profile.minRatePerMile) reasons.push(`Rate per mile is $${ratePerMile.toFixed(2)}, above the driver's target.`);
  if (load.deadheadMiles <= profile.maxDeadheadMiles) reasons.push(`Deadhead is ${load.deadheadMiles} miles, inside the configured limit.`);
  if (load.hosFeasible) reasons.push("HOS check is feasible for the current profile.");
  if (load.returnLoadProbability >= 75) reasons.push(`Return-load probability is ${load.returnLoadProbability}%.`);
  if (load.brokerReliability >= 85) reasons.push(`Broker reliability is strong at ${load.brokerReliability}/100.`);

  if (!load.hosFeasible) risks.push("HOS feasibility is flagged as unsafe for this demo profile.");
  if (load.deadheadMiles > profile.maxDeadheadMiles) risks.push(`Deadhead exceeds the ${profile.maxDeadheadMiles}-mile preference.`);
  if (load.parkingRisk === "high") risks.push("Parking risk is high near the delivery window.");
  if (load.brokerReliability < 75) risks.push("Broker reliability is below the preferred threshold.");
  if (load.documentRisk !== "low") risks.push(`Document risk is ${load.documentRisk}.`);
  if (load.routeRisk === "high") risks.push("Route risk is high and should be reviewed before booking.");
  if (load.equipment !== profile.truckType) risks.push(`Equipment mismatch: load needs ${load.equipment}.`);
  if (estimatedNetProfit < 900) risks.push("Net profit is thin after fuel and deadhead estimates.");

  if (reasons.length === 0) reasons.push("This load remains in the stack for comparison, but no standout positive signal is present.");
  if (risks.length === 0) risks.push("No major demo risks detected, but confirm live market, HOS, and facility details before booking.");

  return {
    total: Math.round(total),
    netProfitScore: Math.round(netProfitScore),
    ratePerMileScore: Math.round(ratePerMileScore),
    deadheadScore: Math.round(deadheadScore),
    hosScore: Math.round(hosScore),
    parkingScore: Math.round(parkingScore),
    brokerScore: Math.round(brokerScore),
    returnLoadScore: Math.round(returnLoadScore),
    riskScore,
    estimatedNetProfit,
    ratePerMile,
    reasons,
    risks,
  };
}

export function sortLoadsByRecommendation(
  loads: MarketplaceLoad[],
  profile: DriverGrowthProfile,
) {
  return [...loads]
    .map((load) => ({ load, score: scoreMarketplaceLoad(load, profile) }))
    .sort((left, right) => right.score.total - left.score.total);
}
