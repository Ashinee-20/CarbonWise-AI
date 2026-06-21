export type ActivityCategory = "transport" | "food" | "electricity" | "shopping";

export type TransportMode = "car" | "bus" | "train" | "flight" | "bike" | "walk";
export type MealType = "plant" | "mixed" | "meat" | "dairy";
export type ShoppingType = "clothing" | "electronics" | "home" | "services";

export interface DailyActivity {
  date: string;
  transport: {
    mode: TransportMode;
    distanceKm: number;
  };
  food: {
    mealType: MealType;
    meals: number;
  };
  electricity: {
    kwh: number;
    renewablePercent: number;
  };
  shopping: {
    type: ShoppingType;
    spendUsd: number;
  };
}

export interface CategoryEmissions {
  transport: number;
  food: number;
  electricity: number;
  shopping: number;
}

export interface FootprintSummary {
  totalKg: number;
  categoryKg: CategoryEmissions;
  score: number;
  streak: number;
  badges: Badge[];
  weeklyKg: number;
  monthlyKg: number;
  annualProjectionKg: number;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  unlocked: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  detail: string;
  impactKg: number;
  category: ActivityCategory;
}

export interface Challenge {
  id: string;
  title: string;
  detail: string;
  rewardPoints: number;
  category: ActivityCategory;
}

export interface CoachResponse {
  summary: FootprintSummary;
  recommendations: Recommendation[];
  challenge: Challenge;
  insight: string;
  forecast: {
    nextWeekKg: number;
    nextMonthKg: number;
    confidence: number;
  };
}
