import { Router } from "express";
import authRoute from "./authRoutes";
import stockRouter from "./stockRoutes";

const route = Router();

route.use("/user", authRoute);
route.use("/stock", stockRouter);

export default route;
