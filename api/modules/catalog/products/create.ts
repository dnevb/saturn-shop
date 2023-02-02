import { paramCase } from "change-case";
import { zodToJsonSchema } from "zod-to-json-schema";
import fp from "../../../utils/fp.js";
import { pick } from "../../../utils/model.js";
import { productSchema } from "./schema.js";

const body = pick(productSchema, [
  "name",
  "description",
  "currency",
  "price",
  "stock",
  "category",
  "uri",
]);

export default fp(async (app) => {
  app.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["products"],
      body: zodToJsonSchema(body),
      response: { 200: zodToJsonSchema(productSchema) },
    },
    handler: async (req) => {
      if (req.user.role != "admin") return app.httpErrors.unauthorized();

      const body = productSchema.parse(req.body);
      const doc = {
        ...body,
        slug: paramCase(body.name),
        user_id: req.user._id,
      };

      const col = app.mongo.db!.collection("products");
      const categories = app.mongo.db!.collection("categories");

      await Promise.all([
        col.insertOne(doc),
        app.search.index("products").addDocuments([doc]),
      ]);

      if (doc.category) {
        const cat = await categories.findOne({ _id: doc.category!._id });
        if (cat) {
          const total = cat["total_products"] + 1;
          await Promise.all([
            categories.updateOne(
              { _id: cat._id },
              { $set: { total_products: total } }
            ),
            app.search
              .index("categories")
              .updateDocuments([{ _id: cat._id, total_products: total }]),
          ]);
        }
      }

      return doc;
    },
  });
});
