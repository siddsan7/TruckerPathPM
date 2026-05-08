import { acmeTerms } from "@/lib/partner-portal/mock-data";

export function TermsSummaryCard() {
  const rows = [
    ["Partner tier", acmeTerms.partnerTier],
    ["Revenue share", `${acmeTerms.revenueSharePct}%`],
    ["Attribution window", `${acmeTerms.attributionWindowDays} days`],
    ["Payout cadence", acmeTerms.payoutCadence],
    ["Minimum payout", `$${acmeTerms.minimumPayoutUsd}`],
    ["Clawback window", `${acmeTerms.clawbackWindowDays} days`],
    ["Initial term", `${acmeTerms.initialTermMonths} months`],
    ["Demo accounts", `${acmeTerms.demoAccountCount} full-access account`],
  ];

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-semibold text-slate-950">Contract summary</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-[18px] bg-slate-50 p-3">
            <div className="text-xs font-medium text-slate-500">{label}</div>
            <div className="mt-1 font-semibold text-slate-950">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
