import { zodToJsonSchema } from "zod-to-json-schema";
import fp from "../../../utils/fp.js";
import { omit } from "../../../utils/model.js";
import { productSchema } from "./schema.js";

const body = omit(productSchema, [
  "_id",
  "updated",
  "created",
  "deleted",
  "slug",
  "user_id",
]);

export default fp(async (app) => {
  app.route<{ Params: { id: string } }>({
    method: "PATCH",
    url: "/:id",
    schema: {
      tags: ["products"],
      body: zodToJsonSchema(body),
      response: { 200: zodToJsonSchema(productSchema) },
    },
    handler: async (req) => {
      if (req.user.role != "admin") return app.httpErrors.unauthorized();

      const id = req.params["id"];
      const body = productSchema.partial().parse(req.body);

      const col = app.mongo.db!.collection("products");
      const product = await col.findOne({ id });
      if (!product) return app.httpErrors.notFound();

      const updated = new Date().toISOString();
      const doc = { ...body, _id: id, updated };

      await Promise.all([
        col.updateOne({ _id: id }, { $set: doc }),
        app.search.index("products").updateDocuments([doc]),
      ]);

      return { ...product, ...doc };
    },
  });
});
