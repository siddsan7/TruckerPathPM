import type { LifecycleStage, PortalStatus } from "./types";

export const partnerSteps = [
  { id: "contract", label: "Contract", href: "/partner-portal/contract" },
  { id: "payout", label: "Payout", href: "/partner-portal/onboarding/payout" },
  { id: "demo", label: "Demo Account", href: "/partner-portal/onboarding/demo-account" },
  { id: "referrals", label: "Referral Link", href: "/partner-portal/referrals" },
  { id: "earnings", label: "Earnings", href: "/partner-portal/payouts" },
  { id: "dashboard", label: "Dashboard", href: "/partner-portal/dashboard" },
];

export const internalSteps = [
  { id: "terms", label: "Terms", href: "/partner-portal/admin/new-partner" },
  ...partnerSteps,
  { id: "admin", label: "Internal Admin", href: "/partner-portal/admin/partners" },
];

export function lifecycleStatus(stage: LifecycleStage): PortalStatus {
  const map: Record<LifecycleStage, PortalStatus> = {
    terms_draft: "Draft",
    contract_sent: "Contract Sent",
    contract_signed: "Contract Signed",
    payout_ready: "Payout Ready",
    demo_active: "Demo Active",
    referral_active: "Referral Active",
    earnings_pending: "Earnings Pending",
    active: "Active",
    stuck: "Stuck",
  };
  return map[stage];
}
