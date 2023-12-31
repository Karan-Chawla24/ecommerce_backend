import ErrorHandler from "../middlewares/error.js";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const addToCart = async (req, res, next) => {
  try {
    let { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!quantity || isNaN(quantity)) {
      quantity = 1;
    }

    const existingProduct = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (!existingProduct) {
      const newCart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
      await newCart.save();
      return res
        .status(201)
        .json({ success: true, message: "Product added to cart" });
    }

    const existingCartItem = existingProduct.products.find((item) =>
      item.product.equals(productId)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      existingProduct.products.push({ product: productId, quantity }); // Changed to push productId instead of product object
    }

    await existingProduct.save();

    return res
      .status(200)
      .json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const updateCart = await Cart.findOne({ user: userId });
    if (!updateCart) return next(new ErrorHandler("Cart not found", 404));

    const productIndex = updateCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return next(new ErrorHandler("Product not found in the cart", 404));
    }

    const productItem = updateCart.products[productIndex];

    if (productItem.quantity > 1) {
      productItem.quantity -= 1;
    } else {
      updateCart.products.splice(productIndex, 1);
    }

    await updateCart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from Cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updateCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    );

    if (!updateCart) return next(new ErrorHandler("cart not found", 404));
    res.status(200).json({
      success: true,
      message: "Cart Cleared Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCartItems = async (req, res, next) => {
  try {
    const cartItems = await Cart.find().populate("products.product");
    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
