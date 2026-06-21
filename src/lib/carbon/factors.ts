import type { MealType, ShoppingType, TransportMode } from "@/types/carbon";

export const transportKgPerKm: Record<TransportMode, number> = {
  car: 0.192,
  bus: 0.089,
  train: 0.041,
  flight: 0.255,
  bike: 0,
  walk: 0
};

export const mealKg: Record<MealType, number> = {
  plant: 0.7,
  mixed: 1.8,
  dairy: 2.4,
  meat: 4.2
};

export const shoppingKgPerUsd: Record<ShoppingType, number> = {
  clothing: 0.42,
  electronics: 0.62,
  home: 0.35,
  services: 0.12
};

export const gridKgPerKwh = 0.38;
