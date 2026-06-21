import { z } from "zod";

export const activitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  transport: z.object({
    mode: z.enum(["car", "bus", "train", "flight", "bike", "walk"]),
    distanceKm: z.coerce.number().min(0).max(20000)
  }),
  food: z.object({
    mealType: z.enum(["plant", "mixed", "meat", "dairy"]),
    meals: z.coerce.number().int().min(0).max(12)
  }),
  electricity: z.object({
    kwh: z.coerce.number().min(0).max(500),
    renewablePercent: z.coerce.number().min(0).max(100)
  }),
  shopping: z.object({
    type: z.enum(["clothing", "electronics", "home", "services"]),
    spendUsd: z.coerce.number().min(0).max(50000)
  })
});

export const activityListSchema = z.array(activitySchema).min(1).max(370);
export type ActivityInput = z.infer<typeof activitySchema>;
