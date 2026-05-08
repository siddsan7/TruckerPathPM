"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";
import { StatusBadge } from "@/components/partner-portal/StatusBadge";

export default function DemoAccountPage() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setActive(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <PartnerPortalLayout activeStep="demo" title="Your NavPro Demo Account" subtitle="Use this account to demo NavPro to your customers." status={active ? "Demo Active" : "Provisioning"}>
      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">Provisioning status</h2>
          <div className="mt-4 rounded-[20px] bg-slate-50 p-4">
            <StatusBadge status={active ? "Demo Active" : "Provisioning"} />
            <p className="mt-3 text-sm leading-6 text-slate-600">{active ? "Acme's full-feature demo account is ready for prospect demos." : "NavPro Engineering is creating the demo workspace and seeded fleet data."}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {active ? <Link href="/partner-portal/referrals" className="btn-primary">Create Referral Link</Link> : <button onClick={() => setActive(true)} className="btn-primary">Provision Demo Account</button>}
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">Demo credentials</h2>
          {active ? <div className="mt-4 grid gap-3"><Info label="Demo account email" value="demo-acme@truckerpath.example" /><Info label="Temporary setup link" value="truckpath.example/demo/acme/setup" /><Info label="Account type" value="Full-feature demo" /><Info label="Access" value="Active while partnership is active" /><div className="flex flex-wrap gap-3"><button className="btn-primary">Open NavPro Demo</button><button className="btn-outline">Copy Demo Login</button></div></div> : <p className="mt-4 text-sm text-slate-500">Credentials appear after provisioning completes.</p>}
        </div>
      </section>
    </PartnerPortalLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[18px] bg-slate-50 p-3"><div className="text-xs font-medium text-slate-500">{label}</div><div className="mt-1 font-semibold text-slate-950">{value}</div></div>;
}
