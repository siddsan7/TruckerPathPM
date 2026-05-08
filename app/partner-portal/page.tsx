import Link from "next/link";
import { FileSignature, Handshake, ShieldCheck } from "lucide-react";
import { PartnerPortalLayout } from "@/components/partner-portal/PartnerPortalLayout";

const roles = [
  {
    title: "I am an internal partnerships owner",
    body: "Enter agreed terms, send contracts, and monitor partner activation.",
    href: "/partner-portal/admin",
    icon: Handshake,
  },
  {
    title: "I am a partner contact",
    body: "Complete onboarding, get a demo account, share referrals, and track earnings.",
    href: "/partner-portal/dashboard",
    icon: ShieldCheck,
  },
  {
    title: "I am reviewing/signing an agreement",
    body: "Check contract status and continue once the agreement is countersigned.",
    href: "/partner-portal/contract",
    icon: FileSignature,
  },
];

export default function PartnerPortalHome() {
  return (
    <PartnerPortalLayout
      title="Partner Portal"
      subtitle="A UX-first post-contract lifecycle for NavPro partners, from terms saved to dashboard visibility."
      status="Demo Flow"
    >
      <section className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <Link
            key={role.title}
            href={role.href}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition hover:border-blue-300 hover:shadow-[0_20px_54px_rgba(37,99,235,0.1)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <role.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-slate-950">{role.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{role.body}</p>
          </Link>
        ))}
      </section>
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
        <h2 className="text-xl font-semibold text-slate-950">Seven-step lifecycle</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-7">
          {["Contract", "Payout", "Demo Account", "Referral", "Payout Calc", "Dashboard", "Admin"].map((step, index) => (
            <div key={step} className="rounded-[18px] bg-slate-50 p-3 text-sm">
              <div className="text-xs font-semibold text-blue-700">Step {index + 1}</div>
              <div className="mt-1 font-semibold text-slate-950">{step}</div>
            </div>
          ))}
        </div>
      </section>
    </PartnerPortalLayout>
  );
}
