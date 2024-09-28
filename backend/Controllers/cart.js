import { Cart } from "../Models/cart.js";

//add to cart
export const addToCart = async (req, res) => {
  const { productId, title, description, price, qty, image, category } =
    req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId: userId });
  if (cart) {
    let productIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );
    if (productIndex > -1) {
      let productItem = cart.items[productIndex];
      productItem.qty += 1;
      productItem.price += price * qty;
    } else {
      cart.items.push({
        productId,
        title,
        description,
        price,
        qty,
        image,
        category,
      });
    }
  } else {
    cart = new Cart({ userId, items: [] });
    cart.items.push({
      productId,
      title,
      description,
      price,
      qty,
      image,
      category,
    });
  }

  await cart.save();
  res.status(200).json({ message: "product added to cart successfully", cart });
};

//get user cart
export const getUserCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (cart) {
    res.status(200).json({ message: "user cart find", cart });
  } else {
    res.status(200).json({ message: "oops! cart not found invalid user!!" });
  }
};

//remove one product from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart)
    return res.json({ message: "oops! cart not found invalid user!!" });

  cart.items = cart.items.filter((item) => item.productId != productId);
  await cart.save();
  res
    .status(200)
    .json({ message: "product removed from cart successfully", cart });
};

//clerar all from cart
export const clearCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    res.status(400).json({ message: "oops! cart not found invalid user!!" });
  } else {
    cart.items = [];
  }
  await cart.save();
  res.status(200).json({ message: "cart cleared successfully", cart });
};

//cart item's qty and price decrease
export const decreaseQty = async (req, res) => {
  const { productId, title, description, price, qty, image, category } =
    req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId: userId });
  if (cart) {
    let productIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );

    if (productIndex > -1) {
      let item = cart.items[productIndex];

      if (item.qty > qty) {
        const priceperUnit = item.price / item.qty;
        item.qty -= 1;
        item.price -= priceperUnit * qty;
      } else {
        cart.items.splice(productIndex, 1);
      }
    }
  } else {
    res.status(400).json({ message: "oops! cart not found invalid user!!" });
  }
  await cart.save();
  res.status(200).json({ message: "Itemm qty decreased", cart });
};
