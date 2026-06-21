import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Recommendation } from "@/types/carbon";

export function Recommendations({ items }: { items: Recommendation[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white/85 p-5 shadow-sm" aria-labelledby="recommendations-title">
      <h2 id="recommendations-title" className="text-lg font-semibold text-ink">
        Personalized Actions
      </h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-ink/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase text-moss">{item.category}</p>
                <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-leaf/12 px-3 py-1 text-sm font-semibold text-moss">
                <CheckCircle2 size={15} aria-hidden="true" />
                {item.impactKg} kg
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/68">{item.detail}</p>
          </article>
        ))}
        {items.length === 0 ? (
          <p className="rounded-lg bg-leaf/10 p-4 text-sm text-ink/70">Log an activity to unlock recommendations.</p>
        ) : (
          <button className="inline-flex w-fit items-center gap-2 rounded-md px-1 py-2 text-sm font-semibold text-moss" type="button">
            Mark an action complete
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
