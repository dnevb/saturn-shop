import { createQueryRoutes } from "../../../utils/misc.js";
import { productSchema } from "./schema.js";

export default createQueryRoutes("products", productSchema);
