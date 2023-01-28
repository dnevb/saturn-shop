import { nanoid } from "nanoid";
import { z } from "zod";

export const BaseModel = z.object({
  _id: z
    .string()
    .length(8)
    .default(() => nanoid(8)),
  created: z.number().default(() => Date.now()),
  updated: z.number().default(() => Date.now()),
  deleted: z.number().optional(),
});
