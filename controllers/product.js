import ErrorHandler from "../middlewares/error.js";
import { Product } from "../models/product.js";

export const newProduct = async (req, res, next) => {
  try {
    const { image, title, description, price } = req.body;
    const product = await Product.create({
      image,
      title,
      description,
      price,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("user");
    res.status(200).json({
      success: true,
      message: "Fetched Products Successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found!", 404));
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
