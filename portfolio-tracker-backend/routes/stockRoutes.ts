import { Router } from "express";
import { addStocks, deleteStocks, updateStocks } from "../controller/stockController";

const stockRouter=Router()

stockRouter.post("/add",addStocks)
stockRouter.post("/update/:id",updateStocks)
stockRouter.delete("/delete/:id",deleteStocks)

export default stockRouter