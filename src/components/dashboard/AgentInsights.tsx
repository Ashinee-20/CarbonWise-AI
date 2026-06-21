import { BrainCircuit, TrendingDown, TrendingUp } from "lucide-react";
import type { CoachAgentInsight } from "@/types/carbon";

export function AgentInsights({ agents }: { agents: CoachAgentInsight[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white/85 p-5 shadow-sm" aria-labelledby="agents-title">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="agents-title" className="text-lg font-semibold text-ink">
            Specialist Agents
          </h2>
          <p className="text-sm text-ink/65">Focused sustainability analysis by behavior category.</p>
        </div>
        <BrainCircuit className="text-moss" size={24} aria-hidden="true" />
      </div>
      <div className="mt-4 grid gap-3">
        {agents.map((agent) => (
          <article key={agent.id} className="rounded-lg border border-ink/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-moss">{agent.name}</p>
                <h3 className="font-semibold capitalize text-ink">{agent.specialty}</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-leaf/12 px-3 py-1 text-sm font-semibold text-moss">
                <TrendingDown size={15} aria-hidden="true" />
                {agent.estimatedWeeklySavingsKg.toFixed(1)} kg/week
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/68">{agent.finding}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-ink">{agent.action}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ComparisonPanel({
  currentWeekKg,
  previousWeekKg,
  weekDeltaPercent,
  currentMonthKg,
  previousMonthKg,
  monthDeltaPercent,
  direction
}: {
  currentWeekKg: number;
  previousWeekKg: number;
  weekDeltaPercent: number;
  currentMonthKg: number;
  previousMonthKg: number;
  monthDeltaPercent: number;
  direction: "improving" | "worsening" | "steady";
}) {
  const Icon = direction === "worsening" ? TrendingUp : TrendingDown;

  return (
    <section className="rounded-lg border border-ink/10 bg-white/85 p-5 shadow-sm" aria-labelledby="comparison-title">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="comparison-title" className="text-lg font-semibold text-ink">
            Historical Comparison
          </h2>
          <p className="text-sm text-ink/65">Current habits compared with your previous logged period.</p>
        </div>
        <span className="rounded-lg bg-skywise/10 p-2 text-skywise" aria-hidden="true">
          <Icon size={22} />
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Metric label="This week" value={`${currentWeekKg.toFixed(1)} kg`} helper={`${formatDelta(weekDeltaPercent)} vs prior week`} />
        <Metric label="This month" value={`${currentMonthKg.toFixed(1)} kg`} helper={`${formatDelta(monthDeltaPercent)} vs prior month`} />
        <Metric label="Prior week" value={`${previousWeekKg.toFixed(1)} kg`} helper="Baseline comparison" />
        <Metric label="Prior month" value={`${previousMonthKg.toFixed(1)} kg`} helper="Longer habit baseline" />
      </div>
    </section>
  );
}

function Metric({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-lg bg-ink/[0.04] p-4">
      <p className="text-sm font-medium text-ink/65">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink/60">{helper}</p>
    </div>
  );
}

function formatDelta(value: number): string {
  if (value === 0) return "0%";
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}
