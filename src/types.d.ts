export interface Meal {
  id: string;
  date: string;
  select: string;
  description: string;
  kcal: string;
}

export type DataMeal = Omit<Meal, 'id', 'select'>;