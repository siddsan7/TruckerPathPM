"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";
import { acmePartner, acmeTerms } from "@/lib/partner-portal/mock-data";

const fields = [
  ["Company legal name", acmePartner.legalName],
  ["Partner type", acmePartner.type],
  ["Primary contact", `${acmePartner.primaryContactName} / ${acmePartner.primaryContactEmail}`],
  ["Signing authority", `${acmePartner.signingAuthorityName} / ${acmePartner.signingAuthorityEmail}`],
  ["Business entity", "LLC"],
  ["Tax form type", "W-9"],
  ["HubSpot deal ID", "HS-98241"],
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

export default function NewPartnerPage() {
  const router = useRouter();
  const [sent, setSent] = useState(false);

  function sendContract() {
    setSent(true);
    window.setTimeout(() => router.push("/partner-portal/contract"), 650);
  }

  return (
    <PartnerPortalLayout
      internal
      activeStep="terms"
      title="New Partner Setup"
      subtitle="Create Acme's partner agreement and start post-contract onboarding."
      status={sent ? "Contract Sent" : "Draft"}
    >
      {sent ? (
        <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          DocuSign envelope sent to Marcus Reyes.
        </div>
      ) : null}
      <section className="grid gap-5 xl:grid-cols-3">
        <Panel title="Partner identity">
          {fields.map(([label, value]) => <InputRow key={label} label={label} value={value} />)}
        </Panel>
        <Panel title="Commercial terms">
          <InputRow label="Partner tier" value={acmeTerms.partnerTier} />
          <InputRow label="Revenue share %" value={`${acmeTerms.revenueSharePct}%`} />
          <InputRow label="Attribution window" value={`${acmeTerms.attributionWindowDays} days`} />
          <InputRow label="Payout cadence" value={`${acmeTerms.payoutCadence}, paid on the 15th`} />
          <InputRow label="Minimum payout" value={`$${acmeTerms.minimumPayoutUsd}`} />
          <InputRow label="Clawback window" value={`${acmeTerms.clawbackWindowDays} days`} />
          <InputRow label="Demo account entitlement" value={`${acmeTerms.demoAccountCount} full-access account`} />
          <InputRow label="Auto-renewal" value={acmeTerms.autoRenewal ? "On" : "Off"} />
        </Panel>
        <Panel title="Contract preview checklist">
          <div className="mb-3"><StatusBadge status="DocuSign Ready" /></div>
          {mergeFields.map(([field, value]) => (
            <div key={field} className="flex items-center justify-between gap-3 border-b border-slate-100 py-2 text-sm">
              <span className="font-mono text-xs text-slate-500">{field}</span>
              <span className="font-semibold text-slate-950">{value}</span>
            </div>
          ))}
          <div className="mt-5 flex flex-wrap gap-3">
            <button data-testid="send-contract" onClick={sendContract} className="btn-primary">Save Terms & Send Contract</button>
            <button className="btn-outline">Save Draft</button>
          </div>
        </Panel>
      </section>
    </PartnerPortalLayout>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"><h2 className="text-lg font-semibold text-slate-950">{title}</h2><div className="mt-4 space-y-3">{children}</div></section>;
}

function InputRow({ label, value }: { label: string; value: string }) {
  return <label className="block text-sm"><span className="font-medium text-slate-600">{label}</span><input className="input mt-1" value={value} readOnly /></label>;
}
