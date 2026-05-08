import { cn } from "@/lib/cn";
import type { PortalStatus } from "@/lib/partner-portal/types";

export function StatusBadge({ status }: { status: PortalStatus | string }) {
  const tone =
    /Active|Ready|Signed|Complete|Paid|Scheduled|Countersigned/.test(status)
      ? "bg-emerald-50 text-emerald-700"
      : /Stuck|Failed|Needs|Incomplete|Waiting|Pending/.test(status)
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", tone)}>{status}</span>;
}
