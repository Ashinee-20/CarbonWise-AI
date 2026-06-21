"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { calculateActivityEmissions, calculateSummary, sumCategories } from "@/lib/carbon/calculator";
import { sampleActivities } from "@/lib/data/sample-activities";
import type { CoachResponse, DailyActivity } from "@/types/carbon";

const storageKey = "carbonwise.activities";

export function useCarbonData() {
  const [activities, setActivities] = useState<DailyActivity[]>(sampleActivities);
  const [coach, setCoach] = useState<CoachResponse | null>(null);
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setActivities(JSON.parse(saved) as DailyActivity[]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(activities));
  }, [activities]);

  const summary = useMemo(() => calculateSummary(activities), [activities]);
  const trend = useMemo(
    () =>
      activities.slice(-10).map((activity) => ({
        label: activity.date.slice(5),
        value: sumCategories(calculateActivityEmissions(activity))
      })),
    [activities]
  );

  const addActivity = useCallback((activity: DailyActivity) => {
    setActivities((current) => [...current.filter((item) => item.date !== activity.date), activity].sort((a, b) => a.date.localeCompare(b.date)));
  }, []);

  const refreshCoach = useCallback(async () => {
    setIsCoachLoading(true);
    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activities })
      });
      if (!response.ok) throw new Error("Unable to load coach insights");
      setCoach((await response.json()) as CoachResponse);
    } finally {
      setIsCoachLoading(false);
    }
  }, [activities]);

  useEffect(() => {
    void refreshCoach();
  }, [refreshCoach]);

  return { activities, summary, trend, addActivity, coach, isCoachLoading, refreshCoach };
}
