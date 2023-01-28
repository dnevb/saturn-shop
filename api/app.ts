import fastifyAutoload from "@fastify/autoload";
import fastifyMongodb from "@fastify/mongodb";
import fastifySensible from "@fastify/sensible";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fp from "./utils/fp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default fp(async (app, opts) => {
  app.register(fastifyMongodb, {
    forceClose: true,
    url: process.env["DB_URL"]!,
  });
  app.register(fastifySensible);
  app.register(fastifyAutoload, {
    dir: join(__dirname, "modules"),
    options: opts,
  });
});
