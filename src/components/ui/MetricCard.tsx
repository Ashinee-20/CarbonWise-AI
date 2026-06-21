import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
}

export function MetricCard({ label, value, helper, icon: Icon }: MetricCardProps) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white/85 p-4 shadow-sm" aria-label={label}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink/65">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal text-ink">{value}</p>
        </div>
        <span className="rounded-lg bg-leaf/12 p-2 text-moss" aria-hidden="true">
          <Icon size={22} />
        </span>
      </div>
      <p className="mt-3 text-sm text-ink/65">{helper}</p>
    </section>
  );
}
