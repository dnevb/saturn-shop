import fp from "../utils/fp.js";

export default fp(async (app) => {
  // token validation
  app.addHook("onRequest", async (req) => {
    if (req.url.includes(".auth")) return;

    const [err] = await app.to(req.jwtVerify());

    if (err) throw app.httpErrors.unauthorized(err.message);
  });

  // decorate routes
  app.addHook("onRoute", (opts) => {
    if (opts.url.includes(".auth")) return;
    const schema = opts.schema || {};

    opts.schema = { ...schema, security: [{ apiKey: [] }] };
  });
});
