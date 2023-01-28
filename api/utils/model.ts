import { nanoid } from "nanoid";
import { z, ZodObject, ZodRawShape } from "zod";

export const BaseModel = z.object({
  _id: z.any().default(() => nanoid(8)),
  created: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  updated: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  deleted: z.number().optional(),
});

export const pick = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  items: (keyof T)[]
): ZodObject<T> =>
  schema.pick<any>(
    items.reduce((prev, key) => ({ ...prev, [key]: true }), {})
  );

export const omit = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  items: (keyof T)[]
): ZodObject<T> =>
  schema.omit(items.reduce((prev, key) => ({ ...prev, [key]: true }), {}));
