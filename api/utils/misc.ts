import { noCase } from "change-case";
import type { FastifyInstance } from "fastify";
import { z, ZodObject, ZodRawShape } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import fp from "./fp.js";

const searchSchema = z
  .object({
    query: z.string(),
    processingTimeMs: z.number(),
    limit: z.number(),
    offset: z.number(),
    totalPages: z.number(),
    estimatedTotalHits: z.number(),
    totalHits: z.number(),
  })
  .partial();

export const createGetRoute = <T extends ZodRawShape>(
  app: FastifyInstance,
  index: string,
  schema: ZodObject<T>
) =>
  app.route<{ Params: { id: string } }>({
    method: "GET",
    url: "/:id",
    schema: {
      tags: [noCase(index)],
      params: { id: { type: "string" } },
      response: { 200: zodToJsonSchema(schema) },
    },
    handler: async (req) => {
      const col = app.mongo.db!.collection(index);

      const res = await col.findOne({ _id: req.params["id"] });

      return res || app.httpErrors.notFound();
    },
  });

export const createFindRoute = <T extends ZodRawShape>(
  app: FastifyInstance,
  index: string,
  schema: ZodObject<T>
) =>
  app.route<{ Querystring: { q: string; filter: string; sort: string } }>({
    method: "GET",
    url: "/",
    schema: {
      tags: [noCase(index)],
      querystring: {
        q: { type: "string" },
        filter: { type: "string" },
        sort: { type: "string" },
      },
      response: {
        200: zodToJsonSchema(
          searchSchema.extend({ hits: schema.array() })
        ),
      },
    },
    handler: async (req) => {
      const col = app.search.index(index);
      const sort = req.query["sort"];

      return col.search(req.query["q"], {
        filter: req.query["filter"] || "",
        sort: sort ? [sort] : [],
      });
    },
  });

export const createQueryRoutes = <T extends ZodRawShape>(
  index: string,
  schema: ZodObject<T>
) =>
  fp(async (app) => {
    createGetRoute(app, index, schema);
    createFindRoute(app, index, schema);
  });
