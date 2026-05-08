import Link from "next/link";
import { ReferralLinkCard } from "@/components/partner-portal/ReferralLinkCard";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";
import { referrals } from "@/lib/partner-portal/mock-data";

const attributionSteps = [
  {
    title: "Share referral link",
    body: "Sarah shares Acme's referral link or code with a trucking customer.",
    example: "Example: Sarah sends the NavPro one-pager to ABC Trucking.",
  },
  {
    title: "Prospect clicks or enters code",
    body: "The prospect visits NavPro through the link or enters ACME-FUEL-15 during signup.",
    example: "Example: ABC Trucking clicks the Acme link on Jan 3.",
  },
  {
    title: "Signup is matched to Acme",
    body: "If the prospect signs up within 60 days, the portal attributes the customer to Acme.",
    example: "Example: ABC Trucking subscribed on Jan 20 and is attributed to Acme.",
  },
  {
    title: "Revenue becomes commissionable",
    body: "When the customer starts a paid subscription, their net subscription revenue is included in monthly payout calculations.",
    example: "Example: $299 net MRR x 15% revenue share becomes eligible earnings.",
  },
];

export default function ReferralsPage() {
  return (
    <PartnerPortalLayout activeStep="referrals" title="Share Your Referral Link" subtitle="Every customer who signs up through this link is attributed to Acme for 60 days." status="Referral Active">
      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <ReferralLinkCard />
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">How Attribution Works</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            A prospect must sign up within the 60-day attribution window for Acme to receive credit.
          </p>
          <div className="mt-4 space-y-3">
            {attributionSteps.map((step, index) => (
              <article key={step.title} className="grid gap-3 rounded-[18px] border border-slate-200 p-3 md:grid-cols-[44px_minmax(0,1fr)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{step.body}</p>
                  <p className="mt-2 text-xs font-medium text-blue-700">{step.example}</p>
                </div>
              </article>
            ))}
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">Referral activity preview</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.14em] text-slate-500"><tr><th className="border-b py-3">Customer</th><th className="border-b py-3">Clicked</th><th className="border-b py-3">Signup</th><th className="border-b py-3">Attribution</th><th className="border-b py-3">Revenue</th></tr></thead>
              <tbody>{referrals.map((referral) => <tr key={referral.id}><td className="border-b border-slate-100 py-3 font-semibold">{referral.customerName}</td><td className="border-b border-slate-100 py-3">{referral.clickedAt}</td><td className="border-b border-slate-100 py-3">{referral.signupStatus}</td><td className="border-b border-slate-100 py-3"><StatusBadge status={referral.attributed ? "Attributed" : "Needs Review"} /></td><td className="border-b border-slate-100 py-3"><StatusBadge status={referral.commissionStatus} /></td></tr>)}</tbody>
            </table>
          </div>
          <Link href="/partner-portal/payouts" className="btn-primary mt-5">View Earnings Preview</Link>
        </div>
      </section>
    </PartnerPortalLayout>
  );
}
