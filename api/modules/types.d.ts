import type MeiliSearch from "meilisearch";
import type { User } from "./auth/schema";

export declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: User; // user type is return type of `request.user` object
  }
}

export declare module "fastify" {
  interface FastifyInstance {
    search: MeiliSearch;
  }
}
