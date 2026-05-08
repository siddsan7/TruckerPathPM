export type TruckType = "Dry Van" | "Reefer" | "Flatbed";
export type RiskLevel = "low" | "medium" | "high";

export type DriverGrowthProfile = {
  id: string;
  name: string;
  homeBase: string;
  truckType: TruckType;
  hoursRemaining: number;
  maxDeadheadMiles: number;
  minRatePerMile: number;
  preferredTripLength: "short" | "medium" | "long";
  preferredRegions: string[];
  fuelSensitivity: RiskLevel;
  parkingRiskTolerance: RiskLevel;
};

export type MarketplaceLoad = {
  id: string;
  pickupCity: string;
  pickupState: string;
  dropoffCity: string;
  dropoffState: string;
  payout: number;
  miles: number;
  deadheadMiles: number;
  estimatedFuelCost: number;
  pickupWindow: string;
  dropoffWindow: string;
  parkingRisk: RiskLevel;
  hosFeasible: boolean;
  brokerReliability: number;
  returnLoadProbability: number;
  documentRisk: RiskLevel;
  routeRisk: RiskLevel;
  equipment: TruckType;
};

export type LoadScoreBreakdown = {
  total: number;
  netProfitScore: number;
  ratePerMileScore: number;
  deadheadScore: number;
  hosScore: number;
  parkingScore: number;
  brokerScore: number;
  returnLoadScore: number;
  riskScore: number;
  estimatedNetProfit: number;
  ratePerMile: number;
  reasons: string[];
  risks: string[];
};

export type MarketplaceSignal = {
  id: string;
  name: string;
  category:
    | "load_board"
    | "fuel"
    | "parking"
    | "routing"
    | "broker"
    | "documents"
    | "hos";
  status: "connected" | "degraded" | "mocked";
  freshness: string;
  confidence: number;
  impact: string;
};

export type PmCopilotOutput = {
  topInsight: string;
  userPainPoint: string;
  suggestedExperiment: string;
  hypothesis: string;
  primaryMetric: string;
  secondaryMetrics: string[];
  prdDraft: string;
  risksAndMitigations?: string[];
  source?: "fallback" | "gemini";
};

export type ExperimentStatus = "queued" | "designing" | "running" | "shipped";

export type GrowthExperiment = {
  id: string;
  title: string;
  hypothesis: string;
  audience: string;
  treatment: string;
  primaryMetric: string;
  target: string;
  risk: string;
  effort: "S" | "M" | "L";
  status: ExperimentStatus;
};

export type GrowthAnalyticsEvent =
  | "growth_page_viewed"
  | "onboarding_started"
  | "onboarding_completed"
  | "load_recommendation_viewed"
  | "load_card_clicked"
  | "load_saved"
  | "booking_requested"
  | "booking_confirmed"
  | "pm_copilot_generated"
  | "experiment_viewed";
