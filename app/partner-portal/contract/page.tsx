"use client";

import { useState } from "react";
import Link from "next/link";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";
import { TermsSummaryCard } from "@/components/partner-portal/TermsSummaryCard";
import { acmePartner } from "@/lib/partner-portal/mock-data";

export default function ContractPage() {
  const [signed, setSigned] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <PartnerPortalLayout activeStep="contract" title="Partnership Agreement" subtitle={acmePartner.legalName} status={signed ? "Contract Signed" : "Waiting on Signature"}>
      <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
        Terms saved. Contract generation started.
      </div>
      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">Contract status</h2>
          <div className="mt-4 space-y-3">
            {["Contract sent", `Waiting for ${acmePartner.signingAuthorityName}`, "Signed", "Countersigned", "Ready for onboarding"].map((step, index) => (
              <div key={step} className="flex items-center justify-between rounded-[18px] bg-slate-50 p-3">
                <span className="font-medium text-slate-700">{step}</span>
                <StatusBadge status={signed || index < 2 ? "Complete" : "Waiting"} />
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {!signed ? <button onClick={() => setModal(true)} className="btn-primary">Open DocuSign</button> : <Link href="/partner-portal/onboarding/payout" className="btn-primary">Continue to Payout Setup</Link>}
            <button onClick={() => setSigned((current) => !current)} className="btn-outline">Demo: mark {signed ? "unsigned" : "signed"}</button>
          </div>
        </div>
        <TermsSummaryCard />
      </section>
      {modal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-slate-950">DocuSign signing flow</h2>
            <p className="mt-2 text-sm text-slate-600">This would open the DocuSign signing flow.</p>
            <button onClick={() => { setModal(false); setSigned(true); }} className="btn-primary mt-5">Complete mock signature</button>
          </div>
        </div>
      ) : null}
    </PartnerPortalLayout>
  );
}
