import { Cart } from "../models/cart.js";
import { Payment } from "../models/payment.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const checkout = async (req, res, next) => {
  try {
    const cartUser = await Cart.find({}).populate("user");
    const currentUserInfo = cartUser[0].user;
    var options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
      currentUserInfo,
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
  const isSuccess = expectedSignature === razorpay_signature;
  if (isSuccess) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user: req.user,
    });
    res.redirect(`http://localhost:5173/paymentsuccess/${razorpay_payment_id}`);
    const userId = req.user._id;
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    );

  } else {
    res.status(400).json({
      success: false,
    });
  }
};
