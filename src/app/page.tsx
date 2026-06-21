"use client";

import dynamic from "next/dynamic";
import { CalendarDays, Gauge, Leaf, Zap } from "lucide-react";
import { ActivityForm } from "@/components/forms/ActivityForm";
import { BarChart } from "@/components/charts/BarChart";
import { CoachPanel } from "@/components/dashboard/CoachPanel";
import { Achievements } from "@/components/dashboard/Achievements";
import { AgentInsights, ComparisonPanel } from "@/components/dashboard/AgentInsights";
import { Recommendations } from "@/components/dashboard/Recommendations";
import { MetricCard } from "@/components/ui/MetricCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useCarbonData } from "@/hooks/useCarbonData";

const TrendChart = dynamic(() => import("@/components/charts/TrendChart").then((module) => module.TrendChart), {
  ssr: false,
  loading: () => <div className="h-64 rounded-lg border border-ink/10 bg-white/70" aria-label="Loading trend chart" />
});

export default function Home() {
  const { summary, trend, addActivity, coach, isCoachLoading, refreshCoach } = useCarbonData();
  const chartData = [
    { label: "Transport", value: summary.categoryKg.transport, color: "#4b8bbe" },
    { label: "Food", value: summary.categoryKg.food, color: "#49a078" },
    { label: "Electricity", value: summary.categoryKg.electricity, color: "#f3c14b" },
    { label: "Shopping", value: summary.categoryKg.shopping, color: "#b46a4a" }
  ];

  return (
    <main className="min-h-screen">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:p-3" href="#dashboard">
        Skip to dashboard
      </a>
      <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-moss text-white" aria-hidden="true">
            <Leaf size={24} />
          </span>
          <div>
            <p className="text-xl font-bold text-ink">CarbonWise AI</p>
            <p className="text-sm text-ink/65">Personal carbon intelligence for everyday choices</p>
          </div>
        </div>
        <nav aria-label="Primary navigation" className="flex flex-wrap gap-2 text-sm font-semibold text-ink/70">
          <a className="rounded-md px-3 py-2 hover:bg-white" href="#log">
            Log
          </a>
          <a className="rounded-md px-3 py-2 hover:bg-white" href="#analytics">
            Analytics
          </a>
          <a className="rounded-md px-3 py-2 hover:bg-white" href="#coach">
            Coach
          </a>
        </nav>
      </header>

      <section id="dashboard" className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg border border-ink/10 bg-white/75 p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase text-moss">Live footprint dashboard</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Understand today. Improve this week. Forecast the year.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink/68">
            CarbonWise AI turns daily transportation, food, electricity, and shopping behavior into clear scores, practical changes, and a projected carbon twin.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <MetricCard icon={Gauge} label="Total tracked" value={`${summary.totalKg.toFixed(1)} kg`} helper="CO2e across all logs" />
            <MetricCard icon={CalendarDays} label="Monthly pace" value={`${summary.monthlyKg.toFixed(1)} kg`} helper="Recent 30-day footprint" />
            <MetricCard icon={Zap} label="Annual twin" value={`${summary.annualProjectionKg.toLocaleString()} kg`} helper="Projected from habits" />
          </div>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/85 p-6 shadow-soft">
          <ProgressRing value={summary.score} label="Sustainability score" />
          <div className="mt-6 rounded-lg bg-leaf/10 p-4">
            <p className="text-sm font-semibold text-moss">Forecast</p>
            <p className="mt-1 text-2xl font-semibold text-ink">{coach?.forecast.nextMonthKg.toFixed(1) ?? "--"} kg next month</p>
            <p className="mt-1 text-sm text-ink/65">{coach?.forecast.confidence ?? "--"}% confidence from recent trends</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div id="log">
          <ActivityForm onSubmit={addActivity} />
        </div>
        <div id="coach">
          <CoachPanel coach={coach} loading={isCoachLoading} onRefresh={refreshCoach} />
        </div>
      </section>

      <section id="analytics" className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-12 lg:grid-cols-2">
        <BarChart title="Category Breakdown" data={chartData} />
        <TrendChart points={trend} />
        {coach ? <ComparisonPanel {...coach.comparison} /> : null}
        {coach ? <AgentInsights agents={coach.agents} /> : null}
        <Recommendations items={coach?.recommendations ?? []} />
        <Achievements badges={summary.badges} streak={summary.streak} />
      </section>

      <footer className="mx-auto w-full max-w-7xl px-5 pb-8 text-sm text-ink/60">
        Built for privacy-conscious personal tracking. Data stays in browser storage unless submitted to same-origin API routes for calculations.
      </footer>
    </main>
  );
}
