import { Award, Flame } from "lucide-react";
import type { Badge } from "@/types/carbon";

export function Achievements({ badges, streak }: { badges: Badge[]; streak: number }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white/85 p-5 shadow-sm" aria-labelledby="achievements-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="achievements-title" className="text-lg font-semibold text-ink">
          Achievements
        </h2>
        <span className="inline-flex items-center gap-2 rounded-full bg-solar/20 px-3 py-1 text-sm font-semibold text-ink">
          <Flame size={16} aria-hidden="true" />
          {streak} day streak
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {badges.map((badge) => (
          <article key={badge.id} className={`rounded-lg border p-4 ${badge.unlocked ? "border-leaf/50 bg-leaf/10" : "border-ink/10 bg-white/50"}`}>
            <Award className={badge.unlocked ? "text-moss" : "text-ink/30"} size={22} aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-ink">{badge.label}</h3>
            <p className="mt-1 text-sm text-ink/65">{badge.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
