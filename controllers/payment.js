import { instance } from "../server.js";
import crypto from "crypto";

export const checkout = async (req, res, next) => {
  try {
    var options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    console.log("amount", req.body.amount);
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

export const paymentVerification = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_API_KEY)
    .update(body.toString())
    .digest("hex");
  console.log("sig recieved", razorpay_signature);
  console.log("sig generated", expectedSignature);
  res.status(200).json({
    success: true,
  });
};
