import { createQueryRoutes } from "../../../utils/misc.js";
import { categorySchema } from "./schema.js";

export default createQueryRoutes("categories", categorySchema);
