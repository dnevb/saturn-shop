import { z } from "zod";
import { BaseModel } from "../../utils/model.js";

export const userSchema = BaseModel.extend({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "user", "anonymous"]).default("user"),
});
export type User = z.infer<typeof userSchema>;

export const autoload = false;
