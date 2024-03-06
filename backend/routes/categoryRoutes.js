import express from "express";
import {
  createCategory,
  updateCategory,
} from "../controller/categoryController.js";
const router = express.Router();

import {
  authenticate,
  authorizeAdmin,
} from "../middilewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);

export default router;
