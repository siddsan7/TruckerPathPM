export type LifecycleStage =
  | "terms_draft"
  | "contract_sent"
  | "contract_signed"
  | "payout_ready"
  | "demo_active"
  | "referral_active"
  | "earnings_pending"
  | "active"
  | "stuck";

export type Partner = {
  id: string;
  legalName: string;
  displayName: string;
  type: string;
  tier: "Silver" | "Gold" | "Platinum";
  ownerName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  signingAuthorityName: string;
  signingAuthorityEmail: string;
  lifecycleStage: LifecycleStage;
};

export type PartnershipTerms = {
  partnerTier: "Silver" | "Gold" | "Platinum";
  revenueSharePct: number;
  attributionWindowDays: number;
  payoutCadence: "Monthly" | "Quarterly";
  minimumPayoutUsd: number;
  clawbackWindowDays: number;
  demoAccountCount: number;
  effectiveDate: string;
  initialTermMonths: number;
  autoRenewal: boolean;
};

export type Referral = {
  id: string;
  customerName: string;
  clickedAt: string;
  signupStatus: "Clicked" | "Trial Started" | "Signed Up" | "Paid" | "Refunded" | "Churned";
  attributed: boolean;
  netMrr: number;
  commissionStatus: "Pending" | "Eligible" | "Clawback Window" | "Paid" | "Clawed Back";
};

export type Payout = {
  id: string;
  period: string;
  grossReferralMrr: number;
  earnings: number;
  adjustments: number;
  finalPayout: number;
  status: "Scheduled" | "Paid" | "Rolled Over" | "Needs Review";
  payoutDate: string;
};

export type PortalStatus =
  | "Draft"
  | "Contract Sent"
  | "Waiting on Signature"
  | "Contract Signed"
  | "Payout Incomplete"
  | "Payout Ready"
  | "Provisioning"
  | "Demo Active"
  | "Referral Active"
  | "Earnings Pending"
  | "Active"
  | "Stuck"
  | "Needs Review";
