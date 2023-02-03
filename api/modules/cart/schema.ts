import { z } from "zod";
import { BaseModel } from "../../utils/model.js";
import { productSchema } from "../catalog/products/schema.js";

export const cartSchema = BaseModel.extend({
  active: z.boolean().default(false),
  user_id: z.string().optional(),
  total_products: z.number().default(0),
  total_price: z.number().default(0),
  products: productSchema.array(),
});

export type Cart = z.infer<typeof cartSchema>;
