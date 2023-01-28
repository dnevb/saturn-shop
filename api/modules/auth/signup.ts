import argon from "argon2";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import fp from "../../utils/fp.js";
import { omit, pick } from "../../utils/model.js";
import { userSchema } from "./schema.js";

const body = pick(userSchema, [
  "first_name",
  "last_name",
  "email",
  "password",
]);
type body = z.infer<typeof body>;
const response = z.object({
  user: omit(userSchema, ["password"]),
  token: z.string(),
});

export default fp(async (app) => {
  app.route<{ Body: body }>({
    method: "POST",
    url: "/signup",
    schema: {
      tags: ["auth"],
      body: zodToJsonSchema(body),
      response: { 200: zodToJsonSchema(response) },
    },
    handler: async (req) => {
      const data = userSchema.parse(req.body);
      const users = app.mongo.db!.collection("users");

      var [err, user] = await app.to(users.findOne({ email: data.email }));
      if (err) throw app.httpErrors.internalServerError(err.name);

      if (user) throw app.httpErrors.unauthorized("User already exists");

      var [err, hash] = await app.to(argon.hash(data.password));
      var [err] = await app.to(
        users.insertOne({ ...data, password: hash })
      );

      if (err) throw app.httpErrors.internalServerError(err.name);

      const payload = { ...data, password: undefined };
      const token = app.jwt.sign(payload);

      return { user: payload, token };
    },
  });
});

export const autoPrefix = "/.auth";
