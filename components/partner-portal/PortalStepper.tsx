import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type Step = { id: string; label: string; href: string };

export function PortalStepper({ steps, activeId }: { steps: Step[]; activeId: string }) {
  const activeIndex = Math.max(0, steps.findIndex((step) => step.id === activeId));

  return (
    <nav className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_12px_34px_rgba(15,23,42,0.05)]" aria-label="Partner portal progress">
      <div className="flex gap-2 overflow-x-auto">
        {steps.map((step, index) => {
          const complete = index < activeIndex;
          const active = step.id === activeId;
          return (
            <Link
              key={step.id}
              href={step.href}
              className={cn(
                "flex min-w-[130px] flex-1 items-center gap-2 rounded-[18px] border px-3 py-2 text-sm font-semibold transition",
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : complete
                    ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs",
                  active ? "bg-white text-blue-700" : complete ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500",
                )}
              >
                {complete ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              {step.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
