import { Router } from "express";
import authRoute from "./authRoutes";
import stockRouter from "./stockRoutes";
import { authMiddleware } from "../helper/authMiddleware";

const route = Router();

route.use("/user", authRoute);
route.use("/stock", authMiddleware, stockRouter);

export default route;
