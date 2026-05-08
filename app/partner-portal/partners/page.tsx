"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";
import { acmePartner, acmeTerms } from "@/lib/partner-portal/mock-data";

const commercialTerms = [
  ["Partner Tier", acmeTerms.partnerTier],
  ["Revenue Share", `${acmeTerms.revenueSharePct}%`],
  ["Attribution Window", `${acmeTerms.attributionWindowDays} days`],
  ["Payout Cadence", `${acmeTerms.payoutCadence}, paid on the 15th`],
  ["Minimum Payout", `$${acmeTerms.minimumPayoutUsd}`],
  ["Clawback Window", `${acmeTerms.clawbackWindowDays} days`],
  ["Demo Account", `${acmeTerms.demoAccountCount} full-access NavPro demo account`],
  ["Initial Term", `${acmeTerms.initialTermMonths} months`],
  ["Renewal", "Auto-renews unless either party gives 30 days notice"],
];

const mergeFields = [
  ["{{partner_legal_name}}", acmePartner.legalName],
  ["{{partner_tier}}", acmeTerms.partnerTier],
  ["{{revenue_share_pct}}", `${acmeTerms.revenueSharePct}%`],
  ["{{attribution_window_days}}", `${acmeTerms.attributionWindowDays}`],
  ["{{payout_cadence}}", acmeTerms.payoutCadence],
  ["{{minimum_payout_usd}}", `$${acmeTerms.minimumPayoutUsd}`],
  ["{{clawback_window_days}}", `${acmeTerms.clawbackWindowDays}`],
  ["{{initial_term_months}}", `${acmeTerms.initialTermMonths}`],
];

export default function PartnerTermsGatePage() {
  const router = useRouter();

  function saveTerms() {
    window.localStorage.setItem(
      "partnerPortal:mockState",
      JSON.stringify({
        termsSaved: true,
        lifecycleStage: "contract_generation",
        contractStatus: "sent",
        payoutStatus: "not_started",
        demoAccountStatus: "locked",
        referralStatus: "locked",
      }),
    );
    router.push("/partner-portal/contract?termsSaved=1");
  }

  return (
    <PartnerPortalLayout
      title="Partner Terms & Conditions"
      subtitle="Review and save the agreed terms for Acme Fuel Solutions before starting the post-contract partner lifecycle."
      status="Draft"
    >
      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Partner summary
                </div>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">{acmePartner.legalName}</h2>
                <p className="mt-1 text-sm text-slate-500">{acmePartner.type}</p>
              </div>
              <StatusBadge status="Draft" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Info label="Primary contact" value={acmePartner.primaryContactName} />
              <Info label="Signing authority" value={acmePartner.signingAuthorityName} />
              <Info label="Expected referral volume" value="5-10 referrals/month in first 90 days" />
              <Info label="Technical sophistication" value="Low" />
            </div>
          </section>

          <section className="rounded-[28px] border border-blue-200 bg-blue-50 p-6 text-blue-950 shadow-[0_18px_48px_rgba(37,99,235,0.08)]">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Terms & Conditions Summary</h2>
            </div>
            <p className="mt-3 text-sm leading-6">
              These terms will be used to generate the DocuSign agreement, calculate future referral commissions, and determine payout rules.
              Once saved, this version becomes the operational source of truth for the partnership.
            </p>
            <p className="mt-4 rounded-[18px] border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
              If terms change later, create a new terms version. Do not overwrite this one, because historical payouts need to remain reproducible.
            </p>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-semibold text-slate-950">Commercial terms</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {commercialTerms.map(([label, value]) => (
                <label key={label} className="block text-sm">
                  <span className="font-medium text-slate-600">{label}</span>
                  <input className="input mt-1" value={value} readOnly />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-semibold text-slate-950">Merge field preview</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {mergeFields.map(([field, value]) => (
                <div key={field} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="font-mono text-xs text-slate-500">{field}</span>
                  <span className="font-semibold text-slate-950">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            HubSpot Closed Won {"->"} agreed terms saved {"->"} contract generation starts.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="btn-outline">Save Draft</button>
            <button data-testid="save-terms" onClick={saveTerms} className="btn-primary">
              Save Terms
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </PartnerPortalLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-slate-50 p-3">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 font-semibold text-slate-950">{value}</div>
    </div>
  );
}
