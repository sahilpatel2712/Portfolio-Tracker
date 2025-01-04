import { Router } from "express";
import {
  addStocks,
  deleteStocks,
  getStocks,
  searchStocks,
  updateStocks,
} from "../controller/stockController";

const stockRouter = Router();

stockRouter.get("/portfolio", getStocks);
stockRouter.get("/search", searchStocks);
stockRouter.post("/add", addStocks);
stockRouter.put("/update/:id", updateStocks);
stockRouter.delete("/delete/:id", deleteStocks);

export default stockRouter;
