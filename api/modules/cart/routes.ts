import type { FastifyInstance } from "fastify";
import fp from "../../utils/fp.js";
import { productSchema } from "../catalog/products/schema.js";
import { Cart, cartSchema } from "./schema.js";

export default fp(async (app) => {
  app.get("/", (req) => getCart(req.user["_id"], app));
  app.get("/count", (req) =>
    getCart(req.user["_id"], app).then((res) => res.products.length)
  );

  app.route({
    method: "POST",
    url: "/complete",
    handler: async (req) => {
      const user_id = req.user["_id"];
      const col = app.mongo.db!.collection("products");
      let cart = await getCart(user_id, app);
      cart.active = false;

      await app.mongo
        .db!.collection("cart")
        .updateOne({ _id: cart._id }, { $set: { active: false } });

      for await (let p of cart.products) {
        const current = await col.findOne({ _id: p._id });
        let stock = current!["stock"] - p.stock;
        if (stock < 0) stock = 0;
        await Promise.all([
          col.updateOne({ _id: current!._id }, { $set: { stock } }),
          app.search
            .index("products")
            .updateDocuments([{ _id: current!._id, stock }]),
        ]);
      }

      return cart;
    },
  });

  app.route({
    method: "POST",
    url: "/",
    handler: async (req) => {
      const product = productSchema.parse(req.body);
      const col = app.mongo.db!.collection("cart");
      const user_id = req.user["_id"];

      let cart = await getCart(user_id, app);

      const index = cart.products.findIndex((p) => p._id == product._id);

      if (index != -1) {
        const current = cart.products[index];
        cart.products[index] = {
          ...product,
          stock: product.stock + current!.stock,
        };
      } else cart.products.push(product);
      cart.total_products = cart.products.length;
      cart.total_price = cart.products.reduce(
        (total, p) => total + p.price * p.stock,
        0
      );

      await col.updateOne({ _id: cart._id }, { $set: cart });

      return cart;
    },
  });

  app.route<{ Params: { id: string } }>({
    method: "DELETE",
    url: "/:id",
    handler: async (req) => {
      const col = app.mongo.db!.collection("cart");
      const user_id = req.user["_id"];

      const cart = await getCart(user_id, app);

      cart.products = cart.products.filter(
        (p) => p._id != req.params["id"]
      );

      cart.total_products = cart.products.length;
      cart.total_price = cart.products.reduce(
        (total, p) => total + p.price,
        0
      );

      await col.updateOne(
        { _id: cart._id },
        {
          $set: cart,
        }
      );

      return cart;
    },
  });
});

const getCart = async (
  user: string,
  app: FastifyInstance
): Promise<Cart> => {
  const col = app.mongo.db!.collection("cart");
  const user_id = user;
  let cart = await col.findOne({ active: true, user_id });

  if (!cart) {
    const res = await col.insertOne({
      active: true,
      user_id,
      products: [],
    });
    return cartSchema.parse(await col.findOne({ _id: res.insertedId }));
  }

  return cartSchema.parse(cart);
};
