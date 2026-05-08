import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MetricCard } from "@/components/partner-portal/MetricCard";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";

const systems = [
  "HubSpot -> source of truth for pre-contract deal/contact data",
  "DocuSign -> contract template and signature status",
  "Stripe Connect -> payout onboarding and transfers",
  "NavPro API -> demo account provisioning and subscription data",
  "Portal DB -> partner terms, referral attribution, payout snapshots",
  "Notion -> partner resources and SOP links",
  "Gmail -> partner-facing notifications",
];

export default function PartnerPortalAdminHome() {
  return (
    <PartnerPortalLayout
      internal
      activeStep="admin"
      title="Partner Program Admin"
      subtitle="Monitor onboarding, referrals, payout readiness, and stalled partners."
      status="Needs Review"
    >
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Partners in motion" value="14" note="4 active, 3 stuck, 7 onboarding" />
        <MetricCard label="Referrals this month" value="37" note="Across active partner links" />
        <MetricCard label="Pending payouts" value="$8.4k" note="Finance review before Feb 15" />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">Start the Acme post-contract flow</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            The portal begins after HubSpot Closed Won. Mihir saves agreed terms, the DocuSign envelope is generated, then Sarah and Marcus move through onboarding.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/partner-portal/admin/new-partner" className="btn-primary">
              New partner setup
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/partner-portal/admin/partners" className="btn-outline">View partner table</Link>
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">System mapping</h2>
          <div className="mt-4 space-y-2">
            {systems.map((system) => (
              <div key={system} className="rounded-[16px] bg-slate-50 p-3 text-sm text-slate-700">{system}</div>
            ))}
          </div>
          <p className="mt-4 rounded-[16px] bg-amber-50 p-3 text-sm leading-6 text-amber-900">
            Potential buy options for referral tracking: Tolt, Rewardful, PartnerStack. For v1, use mocked internal flow or buy if speed matters more than custom control.
          </p>
        </div>
      </section>
    </PartnerPortalLayout>
  );
}
