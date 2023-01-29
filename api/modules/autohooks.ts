import fp from "../utils/fp.js";

export default fp(async (app) => {
  // token validation
  app.addHook("onRequest", async (req, res) => {
    if (req.url.includes(".auth")) return;

    var [err] = await app.to(req.jwtVerify());

    if (err) return res.unauthorized(err.message);

    return;
  });

  // decorate routes
  app.addHook("onRoute", (opts) => {
    if (opts.url.includes(".auth")) return;
    const schema = opts.schema || {};

    opts.schema = { ...schema, security: [{ apiKey: [] }] };
  });
});
