import { z } from "zod";
import { BaseModel } from "../../../utils/model.js";
import { categorySchema } from "../categories/schema.js";

export const productSchema = BaseModel.extend({
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().gte(0).default(0),
  price: z.number().gte(0).default(0),
  currency: z
    .string()
    .default("USD")
    .transform((v) => v.toUpperCase()),
  category: categorySchema.optional(),
  user_id: z.string().optional(),
  uri: z.string().optional(),
});
export type Product = z.infer<typeof productSchema>;
