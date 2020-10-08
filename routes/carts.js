const express = require("express");
const cartsRepository = require("../repositories/carts");
const router = express.Router();

router.post("/cart/products", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepository.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepository.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepository.update(cart.id, {
    items: cart.items,
  });
  res.send("product added to cart");
});

module.exports = router;
