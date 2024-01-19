import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const maxAgeInMinutes = 20;
  const maxAgeMilliseconds = maxAgeInMinutes * 60 * 1000;
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: maxAgeMilliseconds,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};

export function calculateTotalAmount(products) {
  if (!Array.isArray(products) || products.length === 0) {
    return 0;
  }

  return products.reduce((total, cartItem) => {
    if (cartItem.product && cartItem.product.price && cartItem.quantity) {
      return total + (cartItem.product.price * cartItem.quantity);
    } else {
      return total;
    }
  }, 0);
}