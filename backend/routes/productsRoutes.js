import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Controller
import { addProduct } from "../controller/productController.js";

import { authenticate, authorizeAdmin } from "../middilewares/authMiddleware.js";
import checkId from "../middilewares/checkId.js";

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

export default router;
