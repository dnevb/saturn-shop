import argon from "argon2";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import fp from "../../utils/fp.js";
import { omit, pick } from "../../utils/model.js";
import { userSchema } from "./schema.js";

const reqBody = pick(userSchema, ["email", "password"]);
type reqBody = z.infer<typeof reqBody>;
const response = z.object({
  user: omit(userSchema, ["password"]),
  token: z.string(),
});

export default fp(async (app) => {
  app.route<{ Body: reqBody }>({
    method: "POST",
    url: "/signin",
    schema: {
      tags: ["auth"],
      body: zodToJsonSchema(reqBody),
      response: { 200: zodToJsonSchema(response) },
    },
    handler: async (req) => {
      const body = req.body;
      const col = app.mongo.db!.collection("users");

      var [err, user] = await app.to(col.findOne({ email: body.email }));
      if (err) throw app.httpErrors.internalServerError(err.name);

      if (!user) throw app.httpErrors.unauthorized("User not found");

      var [err, isvalid] = await app.to(
        argon.verify(user["password"], body.password)
      );

      if (err || !isvalid)
        throw app.httpErrors.unauthorized("Invalid credentials");

      const token = app.jwt.sign({ ...user, password: undefined });

      return { user, token };
    },
  });
});

export const autoPrefix = "/.auth";
