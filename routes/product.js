import express from "express";
import {
  getAllProducts,
  getProductById,
  newProduct,
} from "../controllers/product.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newProduct);

router.get("/getAllProducts", isAuthenticated, getAllProducts);

router.get("/:id", isAuthenticated, getProductById);

export default router;
