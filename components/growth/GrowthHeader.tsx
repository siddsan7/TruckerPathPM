import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";

export function GrowthHeader() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Demo mode: seeded marketplace data, deterministic scoring, optional AI insight generation
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <BadgeCheck className="h-3.5 w-3.5" />
              Built for AI-Native PM
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Marketplace Growth Layer
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            AI-native load discovery, onboarding, booking conversion, and carrier retention for Trucker Path's marketplace.
          </p>
          <div className="mt-4 rounded-[20px] border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-blue-950">
            The dispatcher OS already helps operations teams manage routes, exceptions, and assignments. This layer adds the product-growth view:
            how drivers discover loads, why they trust recommendations, where they drop before booking, and which experiments can improve marketplace
            performance.
          </div>
        </div>
        <Link href="/reports" className="btn-outline">
          Back to Reports
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
        {["load discovery", "booking", "onboarding", "marketplace integrations", "activation -> conversion -> retention"].map((item) => (
          <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
