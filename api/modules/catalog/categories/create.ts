import { paramCase } from "change-case";
import { zodToJsonSchema } from "zod-to-json-schema";
import fp from "../../../utils/fp.js";
import { pick } from "../../../utils/model.js";
import { Category, categorySchema } from "./schema.js";

const body = pick(categorySchema, ["name", "description", "parent_id"]);

export default fp(async (app) => {
  app.route<{ Body: Category }>({
    method: "POST",
    url: "/",
    schema: {
      tags: ["categories"],
      body: zodToJsonSchema(body),
    },
    handler: async (req) => {
      if (req.user["role"] != "admin")
        return app.httpErrors.unauthorized();

      const data = categorySchema.parse(req.body);
      const slug = paramCase(data.name);

      const categories = app.mongo.db!.collection("categories");

      var exists = await categories.findOne({ slug });

      if (exists) return exists;

      const doc = {
        ...data,
        user_id: req.user._id,
        slug,
        is_root: !data.parent_id,
      };
      await Promise.all([
        categories.insertOne(doc),
        app.search.index("categories").addDocuments([doc]),
      ]);

      return doc;
    },
  });
});
