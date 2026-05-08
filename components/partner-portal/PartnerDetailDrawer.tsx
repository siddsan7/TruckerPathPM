import type { adminPartners } from "@/lib/partner-portal/mock-data";
import { acmeTerms, lifecycleEvents, referralLink } from "@/lib/partner-portal/mock-data";
import { lifecycleStatus } from "@/lib/partner-portal/status";
import { StatusBadge } from "./StatusBadge";

type AdminPartner = (typeof adminPartners)[number];

export function PartnerDetailDrawer({ partner }: { partner: AdminPartner | null }) {
  if (!partner) {
    return (
      <aside className="rounded-[24px] border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
        Select a partner to inspect lifecycle state.
      </aside>
    );
  }

  return (
    <aside className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{partner.displayName}</h2>
          <p className="mt-1 text-sm text-slate-500">{partner.type}</p>
        </div>
        <StatusBadge status={partner.stageLabel ?? lifecycleStatus(partner.lifecycleStage)} />
      </div>
      <div className="mt-4 rounded-[18px] bg-blue-50 p-3 text-sm text-blue-950">
        <div className="font-semibold">Recommended next action</div>
        <div className="mt-1">{partner.nextAction}</div>
        {partner.stuckReason ? <div className="mt-2 text-blue-800">{partner.stuckReason}</div> : null}
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <Info label="Primary contact" value={`${partner.primaryContactName} / ${partner.primaryContactEmail}`} />
        <Info label="Signer" value={`${partner.signingAuthorityName} / ${partner.signingAuthorityEmail}`} />
        <Info label="Terms" value={`${acmeTerms.revenueSharePct}% rev share / ${acmeTerms.attributionWindowDays}-day attribution`} />
        <Info label="Referral link" value={partner.id === "partner_acme" ? referralLink : "Not issued yet"} />
        <Info label="Payout summary" value={`$${partner.pendingEarnings.toFixed(2)} pending / $${partner.paidEarnings.toFixed(2)} paid / ${partner.payoutStatus}`} />
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-950">Lifecycle timeline</h3>
        <div className="mt-3 space-y-2">
          {lifecycleEvents.map((event, index) => (
            <div key={event.label} className="rounded-[16px] bg-slate-50 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium text-slate-900">{event.label}</div>
                <StatusBadge status={partner.stuckReason && index > 2 ? "Blocked" : event.status} />
              </div>
              <div className="mt-0.5 text-xs text-slate-500">{event.owner} / {event.date}</div>
            </div>
          ))}
        </div>
      </div>
      {partner.stuckReason ? (
        <div className="mt-5 rounded-[18px] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
          This partner is stuck because {partner.stuckReason.toLowerCase()}.
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="btn-primary">Send Reminder</button>
        <button className="btn-outline">View Partner Dashboard</button>
        <button className="btn-outline">Open Terms</button>
      </div>
    </aside>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-slate-200 p-3">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 break-words text-slate-800">{value}</div>
    </div>
  );
}
