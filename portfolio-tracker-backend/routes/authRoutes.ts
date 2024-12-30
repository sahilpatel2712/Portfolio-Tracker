import { Router } from "express";
import {
  signinController,
  signupController,
} from "../controller/authController";

const authRoute = Router();

authRoute.post("/signup", signupController);
authRoute.post("/signin", signinController);


export default authRoute
