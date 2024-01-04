import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import Razorpay from "razorpay";

connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_API_KEY,
});

app.listen(process.env.PORT, () => {
  console.log("Server is Working");
});
