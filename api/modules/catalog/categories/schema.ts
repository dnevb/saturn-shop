import { z } from "zod";
import { BaseModel } from "../../../utils/model.js";

export const categorySchema = BaseModel.extend({
  name: z.string(),
  slug: z.string().optional(),
  user_id: z.string().optional(),
  description: z.string().optional(),
  uri: z.string().optional(),
  total_products: z.number().default(0),
  parent_id: z.string().optional(),
  is_root: z.boolean().optional(),
});

export type Category = z.infer<typeof categorySchema>;
