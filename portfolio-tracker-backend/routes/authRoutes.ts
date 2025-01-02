import { Router } from "express";
import {
  getUserDetail,
  signinController,
  signupController,
} from "../controller/authController";
import { authMiddleware } from "../helper/authMiddleware";

const authRoute = Router();

authRoute.get("/detail", authMiddleware, getUserDetail);
authRoute.post("/signup", signupController);
authRoute.post("/signin", signinController);

export default authRoute;
