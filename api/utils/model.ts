import { nanoid } from "nanoid";
import { z } from "zod";

export const BaseModel = z.object({
  _id: z
    .string()
    .length(8)
    .default(() => nanoid(8))
    .optional(),
  created: z
    .string()
    .datetime()
    .default(() => new Date().toISOString())
    .optional(),
  updated: z
    .string()
    .datetime()
    .default(() => new Date().toISOString())
    .optional(),
  deleted: z.number().optional(),
});
