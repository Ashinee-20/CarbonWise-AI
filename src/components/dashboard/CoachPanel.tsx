"use client";

import { Bot, BrainCircuit, Sparkles, Target, WandSparkles } from "lucide-react";
import type { CoachResponse } from "@/types/carbon";

interface CoachPanelProps {
  coach: CoachResponse | null;
  loading: boolean;
  onRefresh: () => void;
}

export function CoachPanel({ coach, loading, onRefresh }: CoachPanelProps) {
  return (
    <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-soft" aria-labelledby="coach-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-white/10 p-2" aria-hidden="true">
            <Bot size={22} />
          </span>
          <div>
            <h2 id="coach-title" className="text-lg font-semibold">
              AI Sustainability Coach
            </h2>
            <p className="text-sm text-white/70">Context-aware guidance from your current behavior.</p>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold transition hover:bg-white/10"
          onClick={onRefresh}
          type="button"
        >
          <WandSparkles size={16} aria-hidden="true" />
          {loading ? "Thinking" : "Refresh"}
        </button>
      </div>

      <p className="mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-white/85">{coach?.insight ?? "Loading personalized insight..."}</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <article className="rounded-lg bg-white/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Target size={17} aria-hidden="true" />
            Daily Challenge
          </div>
          <h3 className="mt-3 text-xl font-semibold">{coach?.challenge.title ?? "Preparing challenge"}</h3>
          <p className="mt-2 text-sm text-white/75">{coach?.challenge.detail ?? "A new challenge will appear once your data is ready."}</p>
          <p className="mt-3 text-sm font-semibold text-solar">+{coach?.challenge.rewardPoints ?? 0} points</p>
        </article>
        <article className="rounded-lg bg-white/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles size={17} aria-hidden="true" />
            Carbon Twin
          </div>
          <p className="mt-3 text-3xl font-semibold">{coach?.summary.annualProjectionKg.toLocaleString() ?? "--"} kg</p>
          <p className="mt-2 text-sm text-white/75">Projected annual emissions if current habits continue.</p>
        </article>
        <article className="rounded-lg bg-white/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BrainCircuit size={17} aria-hidden="true" />
            AI Assistant
          </div>
          <p className="mt-3 text-sm text-white/85">{coach?.assistant.headline ?? "Building a personalized action plan..."}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-white/75">
            {coach?.assistant.focusAreas.map((item) => (
              <li key={item} className="list-disc pl-4">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            {coach?.assistant.actionPlan.map((step) => (
              <p key={step} className="rounded-lg bg-white/5 p-3 text-sm text-white/80">
                {step}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
