import { Router } from "express";
import {registerUser, loginUser,listAllUsers,forgotPassword,resetPassword} from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/list-all-users").get(listAllUsers);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").put(resetPassword);

export default router