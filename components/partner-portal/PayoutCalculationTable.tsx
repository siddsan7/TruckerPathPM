import { referrals } from "@/lib/partner-portal/mock-data";
import { StatusBadge } from "./StatusBadge";

export function PayoutCalculationTable() {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-semibold text-slate-950">Current period calculation</h2>
      <p className="mt-2 text-sm text-slate-500">Net subscription revenue x 15% revenue share = partner earnings</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="border-b border-slate-200 py-3">Customer</th>
              <th className="border-b border-slate-200 py-3">Net MRR</th>
              <th className="border-b border-slate-200 py-3">Rev Share</th>
              <th className="border-b border-slate-200 py-3">Status</th>
              <th className="border-b border-slate-200 py-3 text-right">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {referrals.slice(0, 3).map((referral) => (
              <tr key={referral.id}>
                <td className="border-b border-slate-100 py-3 font-semibold text-slate-950">{referral.customerName}</td>
                <td className="border-b border-slate-100 py-3">${referral.netMrr}</td>
                <td className="border-b border-slate-100 py-3">15%</td>
                <td className="border-b border-slate-100 py-3">
                  <StatusBadge status={referral.commissionStatus} />
                </td>
                <td className="border-b border-slate-100 py-3 text-right font-semibold">${(referral.netMrr * 0.15).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
