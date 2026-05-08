import Link from "next/link";
import { IconRail } from "@/components/icon-rail";
import { TopHeader } from "@/components/top-header";
import { acmePartner } from "@/lib/partner-portal/mock-data";
import { internalSteps, partnerSteps } from "@/lib/partner-portal/status";
import { PortalStepper } from "./PortalStepper";
import { StatusBadge } from "./StatusBadge";

type Props = {
  activeStep?: string;
  internal?: boolean;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  status?: string;
};

export function PartnerPortalLayout({ activeStep, internal = false, title, subtitle, children, status }: Props) {
  const steps = internal ? internalSteps : partnerSteps;

  return (
    <div className="flex h-screen flex-col">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <IconRail />
        <main className="flex-1 overflow-auto bg-[#f5f6f8] p-6">
          <div className="mx-auto max-w-[1500px] space-y-5">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-500">
                    <Link href="/partner-portal" className="font-medium text-blue-700 hover:underline">
                      Partner Portal
                    </Link>{" "}
                    / {acmePartner.displayName} / {title}
                  </div>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={status ?? (internal ? "Needs Review" : "Active")} />
                  <span className="text-xs text-slate-500">{internal ? "Internal operations view" : "Partner-facing view"}</span>
                </div>
              </div>
            </div>
            {activeStep ? <PortalStepper steps={steps} activeId={activeStep} /> : null}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
