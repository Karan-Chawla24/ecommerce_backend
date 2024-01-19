import { Order } from "../models/order.js";

export const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orderHistory = await Order.find({ user: userId }).populate(
      "products.product"
    );
    res.status(200).json({ success: true, orderHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
