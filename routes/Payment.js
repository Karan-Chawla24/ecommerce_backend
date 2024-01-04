import express from "express";
import { checkout } from "../controllers/payment.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/checkout", isAuthenticated, checkout);

export default router;
