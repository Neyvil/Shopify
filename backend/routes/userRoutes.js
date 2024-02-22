import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controller/userController.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middilewares/authMiddleware.js";

const router = express.Router();

// Creating User and Checking Authenticate
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

// Authourise Route LogIn
http://localhost:5000/api/users/auth
router.post("/auth", loginUser);

// User Log Out
router.post("/logout", logoutCurrentUser);
// Profile route
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUser);

// Admin Routes

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate,authorizeAdmin, updateUserById)
export default router;
