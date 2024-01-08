import express from "express";
import { Login, Logout, Profile, Register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile", isAuthenticated, Profile);

router.post("/register", Register);

router.post("/login", Login);

router.get("/logout", Logout);

export default router;
