import { Router } from "express";
import {
  addStocks,
  deleteStocks,
  getPortfolio,
  searchStocks,
  updateStocks,
  getStockData
} from "../controller/stockController";

const stockRouter = Router();

stockRouter.get("/data", getStockData);
stockRouter.get("/portfolio", getPortfolio);
stockRouter.get("/search", searchStocks);
stockRouter.post("/add", addStocks);
stockRouter.put("/update/:id", updateStocks);
stockRouter.delete("/delete/:id", deleteStocks);

export default stockRouter;
