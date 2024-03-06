import express from "express";
import { createCategory } from "../controller/categoryController.js";
const router = express.Router();


import {
  authenticate,
  authorizeAdmin,
} from "../middilewares/authMiddleware.js";

router.route("/").post(createCategory);

export default router;
