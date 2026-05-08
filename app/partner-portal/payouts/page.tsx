import Link from "next/link";
import { MetricCard } from "@/components/partner-portal/MetricCard";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { PayoutCalculationTable } from "@/components/partner-portal/PayoutCalculationTable";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";

export default function PayoutsPage() {
  return (
    <PartnerPortalLayout activeStep="earnings" title="Earnings & Payouts" subtitle="Track pending earnings, paid payouts, rollovers, and clawbacks." status="Earnings Pending">
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Pending earnings" value="$342.75" />
        <MetricCard label="Eligible next payout" value="$292.75" />
        <MetricCard label="Rollover balance" value="$0" />
        <MetricCard label="Paid lifetime" value="$1,240.50" />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <PayoutCalculationTable />
        <div className="space-y-5">
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <h2 className="text-lg font-semibold">Clawback policy</h2>
            <p className="mt-2 text-sm leading-6">If a customer cancels or refunds within 60 days, the commission is deducted from a future payout.</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
            <h2 className="text-lg font-semibold text-slate-950">Next payout</h2>
            <div className="mt-4 space-y-3 text-sm">
              <Info label="Payout date" value="Feb 15" />
              <Info label="Method" value="Stripe Connect" />
              <Info label="Minimum threshold" value="$50" />
              <div className="flex items-center justify-between rounded-[16px] bg-slate-50 p-3"><span>Status</span><StatusBadge status="Scheduled" /></div>
            </div>
            <Link href="/partner-portal/dashboard" className="btn-primary mt-5">Go to Partner Dashboard</Link>
          </div>
        </div>
      </section>
    </PartnerPortalLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between rounded-[16px] bg-slate-50 p-3"><span className="text-slate-500">{label}</span><span className="font-semibold text-slate-950">{value}</span></div>;
}
