import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Controller
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
} from "../controller/productController.js";

import {
  authenticate,
  authorizeAdmin,
} from "../middilewares/authMiddleware.js";
import checkId from "../middilewares/checkId.js";

router.route("/").get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
