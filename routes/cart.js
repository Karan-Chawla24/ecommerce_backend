import express from "express";
import {
  addToCart,
  clearCart,
  getCartItems,
  removeItem,
} from "../controllers/cart.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getcart", isAuthenticated, getCartItems);

router.post("/add", isAuthenticated, addToCart);

router.delete("/remove/:productId", isAuthenticated, removeItem);

router.delete("/clear", isAuthenticated, clearCart);

export default router;
