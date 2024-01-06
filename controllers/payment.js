import { instance } from "../server.js";

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
  console.log(req.body);
  res.status(200).json({
    success: true,
  });
};
