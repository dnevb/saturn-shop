import fastifyAutoload from "@fastify/autoload";
import fastifyMongodb from "@fastify/mongodb";
import fastifySensible from "@fastify/sensible";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pkg from "./package.json" assert { type: "json" };
import fp from "./utils/fp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default fp(async (app, opts) => {
  app.register(fastifyMongodb, {
    forceClose: true,
    url: process.env["DB_URL"]!,
  });
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "API",
        version: pkg.version,
      },
    },
  });
  app.register(fastifySwaggerUi, {
    routePrefix: "/",
    uiConfig: {
      deepLinking: true,
    },
  });
  app.register(fastifySensible);
  app.register(fastifyAutoload, {
    dir: join(__dirname, "modules"),
    options: opts,
  });
});
