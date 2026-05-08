import type { PmCopilotOutput } from "./types";

export const fallbackPmCopilotOutput: PmCopilotOutput = {
  topInsight:
    "Drivers do not trust gross payout alone because fuel, deadhead, parking, and HOS risk change the true value of a load.",
  userPainPoint:
    "Load discovery creates decision fatigue because key profit and risk signals are fragmented.",
  suggestedExperiment:
    "Show estimated net profit, parking risk, and return-load probability directly on load cards.",
  hypothesis:
    "If drivers see net profit and risk context before opening load details, booking-request conversion will increase.",
  primaryMetric: "Booking request conversion rate",
  secondaryMetrics: ["Load save rate", "Load detail CTR", "7-day retention"],
  prdDraft:
    "Build an explainable load recommendation card that combines payout, deadhead, fuel, parking, HOS, broker reliability, and return-load probability into a score with transparent reasoning.",
  risksAndMitigations: [
    "Risk: drivers over-trust estimates. Mitigation: show inputs and confidence tier.",
    "Risk: AI language hides tradeoffs. Mitigation: always render deterministic risks beside generated text.",
  ],
  source: "fallback",
};

export function generateFallbackPmInsight(feedback: string[]): PmCopilotOutput {
  const combined = feedback.join(" ").toLowerCase();
  if (combined.includes("parking")) {
    return {
      ...fallbackPmCopilotOutput,
      topInsight:
        "Parking uncertainty is a trust blocker for late deliveries and should appear before a driver opens details.",
      suggestedExperiment:
        "Add a parking-risk badge and a delivery-window warning to every load card with night dropoff risk.",
      primaryMetric: "Load detail to save rate",
      source: "fallback",
    };
  }
  return fallbackPmCopilotOutput;
}
