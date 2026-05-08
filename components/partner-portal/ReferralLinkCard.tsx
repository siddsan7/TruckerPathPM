"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { referralCode, referralLink } from "@/lib/partner-portal/mock-data";

export function ReferralLinkCard() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(value: string, label: string) {
    void navigator.clipboard?.writeText(value);
    setCopied(label);
  }

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-semibold text-slate-950">Referral code and link</h2>
      <div className="mt-4 space-y-3">
        <div className="rounded-[18px] bg-slate-50 p-3">
          <div className="text-xs font-medium text-slate-500">Referral code</div>
          <div className="mt-1 font-mono text-lg font-semibold text-slate-950">{referralCode}</div>
        </div>
        <div className="rounded-[18px] bg-slate-50 p-3">
          <div className="text-xs font-medium text-slate-500">Referral link</div>
          <div className="mt-1 break-all font-mono text-sm font-semibold text-slate-950">{referralLink}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => copy(referralLink, "link")} className="btn-primary">
          {copied === "link" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Copy link
        </button>
        <button onClick={() => copy(referralCode, "code")} className="btn-outline">
          {copied === "code" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Copy code
        </button>
        <button className="btn-outline">
          <Mail className="h-4 w-4" />
          Email to customer
        </button>
        <button className="btn-outline">
          <Download className="h-4 w-4" />
          Download one-pager
        </button>
      </div>
    </section>
  );
}
