"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bike, Bolt, Car, Leaf, ShoppingBag, Utensils } from "lucide-react";
import type { DailyActivity, MealType, ShoppingType, TransportMode } from "@/types/carbon";

interface ActivityFormProps {
  onSubmit: (activity: DailyActivity) => void;
}

function getLocalDate(): string {
  const date = new Date();
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 10);
}

export function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [activity, setActivity] = useState<DailyActivity>({
    date: getLocalDate(),
    transport: { mode: "car", distanceKm: 12 },
    food: { mealType: "mixed", meals: 3 },
    electricity: { kwh: 12, renewablePercent: 25 },
    shopping: { type: "services", spendUsd: 20 }
  });
  const [saved, setSaved] = useState(false);

  const modes = useMemo<TransportMode[]>(() => ["car", "bus", "train", "bike", "walk", "flight"], []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(activity);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-ink/10 bg-white/90 p-5 shadow-sm" aria-label="Daily activity logging form">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Log Today</h2>
          <p className="text-sm text-ink/65">Track the habits that shape your carbon twin.</p>
        </div>
        <label className="text-sm font-medium text-ink/70">
          Date
          <input
            className="mt-1 block rounded-md border border-ink/15 bg-white px-3 py-2 text-ink"
            type="date"
            value={activity.date}
            onChange={(event) => setActivity({ ...activity, date: event.target.value })}
            required
          />
        </label>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Fieldset icon={Car} title="Transportation">
          <label className="text-sm font-medium text-ink/70">
            Mode
            <select
              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2"
              value={activity.transport.mode}
              onChange={(event) => setActivity({ ...activity, transport: { ...activity.transport, mode: event.target.value as TransportMode } })}
            >
              {modes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </label>
          <NumberField
            label="Distance km"
            value={activity.transport.distanceKm}
            onChange={(value) => setActivity({ ...activity, transport: { ...activity.transport, distanceKm: value } })}
          />
        </Fieldset>

        <Fieldset icon={Utensils} title="Food">
          <label className="text-sm font-medium text-ink/70">
            Meal pattern
            <select
              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2"
              value={activity.food.mealType}
              onChange={(event) => setActivity({ ...activity, food: { ...activity.food, mealType: event.target.value as MealType } })}
            >
              <option value="plant">plant</option>
              <option value="mixed">mixed</option>
              <option value="dairy">dairy</option>
              <option value="meat">meat</option>
            </select>
          </label>
          <NumberField label="Meals" value={activity.food.meals} onChange={(value) => setActivity({ ...activity, food: { ...activity.food, meals: value } })} />
        </Fieldset>

        <Fieldset icon={Bolt} title="Electricity">
          <NumberField
            label="Usage kWh"
            value={activity.electricity.kwh}
            onChange={(value) => setActivity({ ...activity, electricity: { ...activity.electricity, kwh: value } })}
          />
          <NumberField
            label="Renewable %"
            value={activity.electricity.renewablePercent}
            onChange={(value) => setActivity({ ...activity, electricity: { ...activity.electricity, renewablePercent: value } })}
          />
        </Fieldset>

        <Fieldset icon={ShoppingBag} title="Shopping">
          <label className="text-sm font-medium text-ink/70">
            Type
            <select
              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2"
              value={activity.shopping.type}
              onChange={(event) => setActivity({ ...activity, shopping: { ...activity.shopping, type: event.target.value as ShoppingType } })}
            >
              <option value="services">services</option>
              <option value="clothing">clothing</option>
              <option value="electronics">electronics</option>
              <option value="home">home</option>
            </select>
          </label>
          <NumberField label="Spend USD" value={activity.shopping.spendUsd} onChange={(value) => setActivity({ ...activity, shopping: { ...activity.shopping, spendUsd: value } })} />
        </Fieldset>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-md bg-moss px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-ink" type="submit">
          <Leaf size={18} aria-hidden="true" />
          Save activity
        </button>
        <span className="text-sm font-medium text-moss" role="status" aria-live="polite">
          {saved ? "Activity saved" : ""}
        </span>
      </div>
    </form>
  );
}

function Fieldset({ children, icon: Icon, title }: { children: React.ReactNode; icon: typeof Bike; title: string }) {
  return (
    <fieldset className="rounded-lg border border-ink/10 p-4">
      <legend className="flex items-center gap-2 px-1 text-sm font-semibold text-ink">
        <Icon size={18} aria-hidden="true" />
        {title}
      </legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="text-sm font-medium text-ink/70">
      {label}
      <input
        className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink"
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        required
      />
    </label>
  );
}
