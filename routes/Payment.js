import express from "express";
import { checkout, paymentVerification } from "../controllers/payment.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/checkout", isAuthenticated, checkout);
router.post("/paymentverification", isAuthenticated, paymentVerification);

export default router;
