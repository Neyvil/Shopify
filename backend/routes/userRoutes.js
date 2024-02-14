import express from "express";
import {createUser ,loginUser,logoutCurrentUser,getAllUsers} from "../controller/userController.js";
import {authenticate,authorizeAdmin} from "../middilewares/authMiddleware.js";

const router = express.Router()

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);


export default router;