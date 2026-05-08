"use client";

import { useState } from "react";
import Link from "next/link";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";
import { acmePartner } from "@/lib/partner-portal/mock-data";
import { cn } from "@/lib/cn";

const checklist = ["Business identity", "EIN / W-9", "Bank account", "Authorized representative", "Stripe verification"];
const walkthrough = [
  {
    title: "Business Info",
    status: "Ready",
    rows: [
      ["Business legal name", "Acme Fuel Solutions LLC"],
      ["Business type", "Delaware LLC"],
      ["EIN", "On file"],
      ["Business address", "Mocked"],
    ],
    copy: "Stripe uses business details to create the connected account profile.",
    cta: "Continue",
  },
  {
    title: "Authorized Representative",
    status: "Mock KYC",
    rows: [
      ["Representative", acmePartner.primaryContactName],
      ["Role", "VP of Partnerships"],
      ["Verification", "Mock identity check"],
    ],
    copy: "Stripe verifies the person setting up payouts so funds are sent to the right business.",
    cta: "Continue",
  },
  {
    title: "Bank Account",
    status: "Secure",
    rows: [
      ["Routing number", "*********"],
      ["Account number", "**** 4821"],
      ["Account type", "Business checking"],
    ],
    copy: "Bank details are collected by Stripe. The portal should not store sensitive bank credentials.",
    cta: "Continue",
  },
  {
    title: "Tax Form",
    status: "Ready",
    rows: [
      ["Tax form", "W-9"],
      ["Entity", "Acme Fuel Solutions LLC"],
      ["Status", "Ready for review"],
    ],
    copy: "Tax form status gates payout eligibility before monthly transfers are scheduled.",
    cta: "Continue",
  },
  {
    title: "Verification",
    status: "Review",
    rows: [
      ["Business identity", "Verified"],
      ["Representative", "Verified"],
      ["Bank account", "Attached"],
      ["Tax form", "Collected"],
      ["Payout capability", "Enabled"],
    ],
    copy: "This checklist summarizes the requirements Stripe would return to the portal.",
    cta: "Finish Setup",
  },
  {
    title: "Complete",
    status: "Payout Ready",
    rows: [
      ["Payout setup", "Complete"],
      ["Transfer method", "Stripe Connect"],
      ["Eligibility", "Monthly transfers after earnings are calculated"],
    ],
    copy: "Acme is now eligible for monthly Stripe Connect transfers after earnings are calculated.",
    cta: "Return to Portal",
  },
];

export default function PayoutSetupPage() {
  const [complete, setComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  function openWalkthrough() {
    setStep(0);
    setOpen(true);
  }

  function advanceWalkthrough() {
    if (step < walkthrough.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    setComplete(true);
    setOpen(false);
  }

  return (
    <PartnerPortalLayout activeStep="payout" title="Set Up Payouts" subtitle="Connect your bank account so Acme can receive monthly referral earnings." status={complete ? "Payout Ready" : "Payout Incomplete"}>
      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">Payout readiness</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Stripe securely collects bank and tax information. Trucker Path does not store your bank credentials.</p>
          <div className="mt-5 space-y-3">
            {checklist.map((item) => <div key={item} className="flex items-center justify-between rounded-[18px] bg-slate-50 p-3"><span>{item}</span><StatusBadge status={complete ? "Complete" : "Pending"} /></div>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {!complete ? <button onClick={openWalkthrough} className="btn-primary">Start Stripe Connect Setup</button> : <Link href="/partner-portal/onboarding/demo-account" className="btn-primary">Continue to Demo Account</Link>}
          </div>
        </div>
        <div className="rounded-[28px] border border-blue-200 bg-blue-50 p-6 text-blue-950 shadow-[0_18px_48px_rgba(37,99,235,0.08)]">
          <h2 className="text-xl font-semibold">Why this step matters</h2>
          <p className="mt-2 text-sm leading-6">Payout setup happens before referral activation so finance can pay monthly commissions without chasing bank or tax details later.</p>
        </div>
      </section>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-3xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Stripe Connect Payout Setup</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This mocked walkthrough shows what Sarah would complete before Acme can receive monthly referral payouts.
                </p>
              </div>
              <StatusBadge status={walkthrough[step].status} />
            </div>

            <div className="mt-5 grid gap-2 md:grid-cols-6">
              {walkthrough.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setStep(index)}
                  className={cn(
                    "rounded-[16px] border px-3 py-2 text-left text-xs font-semibold",
                    index === step
                      ? "border-blue-600 bg-blue-600 text-white"
                      : index < step
                        ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-white text-slate-600",
                  )}
                >
                  <span className="block text-[11px] opacity-80">{index + 1}</span>
                  {item.title}
                </button>
              ))}
            </div>

            <section className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-950">{walkthrough[step].title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{walkthrough[step].copy}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {walkthrough[step].rows.map(([label, value]) => (
                  <div key={label} className="rounded-[16px] bg-white p-3 text-sm">
                    <div className="text-xs font-medium text-slate-500">{label}</div>
                    <div className="mt-1 font-semibold text-slate-950">{value}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-5 flex flex-wrap justify-between gap-3">
              <button onClick={() => setOpen(false)} className="btn-outline">Cancel</button>
              <div className="flex gap-2">
                {step > 0 ? <button onClick={() => setStep((current) => current - 1)} className="btn-outline">Back</button> : null}
                <button data-testid="stripe-walkthrough-next" onClick={advanceWalkthrough} className="btn-primary">
                  {walkthrough[step].cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PartnerPortalLayout>
  );
}
