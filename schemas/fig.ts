import { z } from "zod";

export const fruits = [
  "apple",
  "apricot",
  "avocado",
  "banana",
  "bell pepper",
  "black berry",
  "blueberry",
  "cantaloupe",
  "cherry",
  "coconut",
  "coffee",
  "desert fig",
  "eggplant",
  "fig",
  "grape",
  "grapefruit",
  "kiwi",
  "lemon",
  "lime",
  "lychee",
  "mango",
  "orange",
  "pear",
  "pineapple",
  "pomegranate",
  "pumpkin",
  "raspberry",
  "strawberry",
  "watermelon",
] as const;

export const FruitSchema = z.enum(fruits);
export type Fruit = z.infer<typeof FruitSchema>;

export const confidences = {} as Record<Fruit, z.ZodString>;
fruits.forEach((fruit) => {
  confidences[fruit] = z.string();
});

export const ConfidencesSchema = z.object(confidences);
export type Confidences = z.infer<typeof ConfidencesSchema>;

export const FigResponseSchema = z.object({
  confidences: ConfidencesSchema,
  fruit: FruitSchema,
  value: z.number(),
});

export type FigResponse = z.infer<typeof FigResponseSchema>;
