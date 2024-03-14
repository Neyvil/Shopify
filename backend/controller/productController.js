import asyncHandler from "../middilewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    console.log(name);
    console.log(description);
    console.log(price);
    console.log(category);
    console.log(quantity);
    console.log(brand);
    
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export { addProduct };
