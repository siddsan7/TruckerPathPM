import { AdminPartnerTable } from "@/components/partner-portal/AdminPartnerTable";
import { MetricCard } from "@/components/partner-portal/MetricCard";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";

const needsAttention = [
  {
    partner: "Desert Insurance Group",
    status: "Payout incomplete",
    issue: "Contract signed 5 days ago, but payout setup is incomplete.",
    action: "Send payout setup reminder to primary contact.",
  },
  {
    partner: "FleetFuel Advisors",
    status: "No referrals",
    issue: "Active for 30 days with zero referrals.",
    action: "Schedule activation call and share referral playbook.",
  },
  {
    partner: "RouteWise Consulting",
    status: "Waiting on signer",
    issue: "Contract sent 3 days ago, still waiting on signer.",
    action: "Resend DocuSign reminder to signing authority.",
  },
];

export default function AdminPartnersPage() {
  return (
    <PartnerPortalLayout internal activeStep="admin" title="Internal Admin View" subtitle="Monitor partner lifecycle status, referral performance, payout readiness, and partners that need follow-up." status="Needs Review">
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Total Partners" value="4" />
        <MetricCard label="Active Partners" value="2" />
        <MetricCard label="Stuck Partners" value="2" />
        <MetricCard label="Referrals This Month" value="14" />
        <MetricCard label="Referred MRR" value="$4,183" />
        <MetricCard label="Pending Payouts" value="$627.45" />
      </section>
      <section className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-amber-950">
        <h2 className="text-lg font-semibold">Needs Attention</h2>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {needsAttention.map((alert) => (
            <article key={alert.partner} className="rounded-[18px] bg-white/75 p-4 text-sm">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-amber-950">{alert.partner}</h3>
                <StatusBadge status={alert.status} />
              </div>
              <p className="mt-2 leading-5">{alert.issue}</p>
              <p className="mt-2 font-semibold">Next action: {alert.action}</p>
            </article>
          ))}
        </div>
      </section>
      <AdminPartnerTable />
    </PartnerPortalLayout>
  );
}
