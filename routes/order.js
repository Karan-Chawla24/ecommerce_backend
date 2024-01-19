import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getOrderHistory } from "../controllers/order.js";

const router = express.Router();

router.get("/orderhistory",isAuthenticated, getOrderHistory);

export default router;

