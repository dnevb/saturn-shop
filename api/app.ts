import fastifyAutoload from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMongodb from "@fastify/mongodb";
import fastifySensible from "@fastify/sensible";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { MeiliSearch } from "meilisearch";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pkg from "./package.json" assert { type: "json" };
import fp from "./utils/fp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default fp(async (app, opts) => {
  const search = new MeiliSearch({ host: process.env["SEARCH_URL"]! });
  app.decorate("search", search);

  app.register(fastifyMongodb, {
    forceClose: true,
    url: process.env["DB_URL"]!,
  });
  app.register(fastifyCors);
  app.register(fastifySwagger, {
    openapi: {
      info: { title: "API", version: pkg.version },
      components: {
        securitySchemes: {
          apiKey: { type: "apiKey", in: "header", name: "Authorization" },
        },
      },
    },
  });
  app.register(fastifySwaggerUi, {
    routePrefix: "/",
    uiConfig: {
      deepLinking: true,
    },
  });
  app.register(fastifyJwt, {
    secret: process.env["SECRET"]!,
  });
  app.register(fastifySensible);
  app.register(fastifyAutoload, {
    dir: join(__dirname, "modules"),
    ignorePattern: /schema.js/,
    autoHooks: true,
    cascadeHooks: true,
    options: opts,
  });
});
