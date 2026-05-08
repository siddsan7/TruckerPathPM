import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function NextActionCard({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return (
    <section className="rounded-[24px] border border-blue-200 bg-blue-50 p-5 text-blue-950 shadow-[0_12px_34px_rgba(37,99,235,0.08)]">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{body}</p>
      <Link href={href} className="btn-primary mt-4">
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
