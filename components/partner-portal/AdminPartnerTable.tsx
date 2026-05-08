"use client";

import { useState } from "react";
import { adminPartners } from "@/lib/partner-portal/mock-data";
import { lifecycleStatus } from "@/lib/partner-portal/status";
import { PartnerDetailDrawer } from "./PartnerDetailDrawer";
import { StatusBadge } from "./StatusBadge";

export function AdminPartnerTable() {
  const [selectedId, setSelectedId] = useState<string | null>(adminPartners[0]?.id ?? null);
  const selected = adminPartners.find((partner) => partner.id === selectedId) ?? null;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
      <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-semibold text-slate-950">Partner lifecycle table</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr>
                {["Partner", "Tier", "Owner", "Stage", "Contract", "Payout", "Demo Account", "Referrals", "Referred MRR", "Pending Earnings", "Next Action"].map((head) => (
                  <th key={head} className="border-b border-slate-200 py-3">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminPartners.map((partner) => (
                <tr key={partner.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelectedId(partner.id)}>
                  <td className="border-b border-slate-100 py-3 font-semibold text-slate-950">{partner.displayName}</td>
                  <td className="border-b border-slate-100 py-3">{partner.tier}</td>
                  <td className="border-b border-slate-100 py-3">{partner.ownerName}</td>
                  <td className="border-b border-slate-100 py-3"><StatusBadge status={partner.stageLabel ?? lifecycleStatus(partner.lifecycleStage)} /></td>
                  <td className="border-b border-slate-100 py-3">{partner.contractStatus}</td>
                  <td className="border-b border-slate-100 py-3">{partner.payoutStatus}</td>
                  <td className="border-b border-slate-100 py-3">{partner.demoStatus}</td>
                  <td className="border-b border-slate-100 py-3">{partner.referrals}</td>
                  <td className="border-b border-slate-100 py-3">${partner.mrr.toLocaleString()}</td>
                  <td className="border-b border-slate-100 py-3">${partner.pendingEarnings.toFixed(2)}</td>
                  <td className="border-b border-slate-100 py-3">{partner.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <PartnerDetailDrawer partner={selected} />
    </div>
  );
}
