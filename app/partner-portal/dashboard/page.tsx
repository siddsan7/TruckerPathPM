import { MetricCard } from "@/components/partner-portal/MetricCard";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";
import { payouts, referrals, referralLink } from "@/lib/partner-portal/mock-data";

export default function PartnerDashboardPage() {
  return (
    <PartnerPortalLayout activeStep="dashboard" title="Welcome back, Sarah" subtitle="Acme Fuel Solutions Partner Dashboard" status="Active">
      <section className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 shadow-[0_12px_34px_rgba(15,118,110,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><div className="text-xl font-semibold">Partnership active</div><p className="mt-1 text-sm">Silver tier / 15% revenue share / Next payout Feb 15</p></div>
          <StatusBadge status="Active" />
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-4 xl:grid-cols-7">
        <MetricCard label="Active referrals" value="8" />
        <MetricCard label="Referred MRR" value="$2,285" />
        <MetricCard label="Pending earnings" value="$342.75" />
        <MetricCard label="Paid earnings" value="$1,240.50" />
        <MetricCard label="Demo account" value="Active" />
        <MetricCard label="Link clicks" value="146" />
        <MetricCard label="Conversion" value="18%" />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">Referral performance</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[["Clicks", 146], ["Signups", 26], ["Paying customers", 8]].map(([label, value]) => <div key={label} className="rounded-[20px] bg-blue-50 p-4"><div className="text-sm text-blue-700">{label}</div><div className="mt-2 text-3xl font-semibold text-blue-950">{value}</div></div>)}
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">Recent referrals</h3>
          <div className="mt-3 space-y-2">{referrals.map((referral) => <div key={referral.id} className="flex items-center justify-between rounded-[18px] bg-slate-50 p-3 text-sm"><span className="font-semibold">{referral.customerName}</span><StatusBadge status={referral.signupStatus} /></div>)}</div>
        </div>
        <div className="space-y-5">
          <Panel title="Payout history">{payouts.map((payout) => <div key={payout.id} className="flex items-center justify-between rounded-[16px] bg-slate-50 p-3 text-sm"><span>{payout.period}</span><span className="font-semibold">${payout.finalPayout.toFixed(2)}</span></div>)}</Panel>
          <Panel title="Demo account"><StatusBadge status="Demo Active" /><button className="btn-primary mt-4">Open NavPro Demo</button></Panel>
          <Panel title="Partner resources">{["Pitch one-pager", "NavPro demo script", "FAQ", "Support: partners@truckerpath.example"].map((item) => <div key={item} className="rounded-[16px] bg-slate-50 p-3 text-sm">{item}</div>)}<div className="mt-3 break-all rounded-[16px] bg-blue-50 p-3 font-mono text-xs text-blue-950">{referralLink}</div></Panel>
        </div>
      </section>
    </PartnerPortalLayout>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]"><h2 className="text-lg font-semibold text-slate-950">{title}</h2><div className="mt-4 space-y-2">{children}</div></section>;
}
