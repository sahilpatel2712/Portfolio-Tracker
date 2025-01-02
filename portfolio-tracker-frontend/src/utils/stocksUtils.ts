import { StockDataType } from "../components/StockTable";
import { isValidArray } from "./objectsValidation";

export const topPerformerStock = (stocksData: StockDataType[]) => {
  if (isValidArray(stocksData)) {
    const topStock = stocksData.reduce((topStock, currentStock) => {
      return Number(currentStock.overall) > Number(topStock.overall)
        ? currentStock
        : topStock;
    });
    return [topStock];
  }
  return [];
};

export const leastPerformerStock = (stocksData: StockDataType[]) => {
  if (isValidArray(stocksData)) {
    const leastStock = stocksData.reduce((leastStock, currentStock) => {
      return Number(currentStock.overall) < Number(leastStock.overall)
        ? currentStock
        : leastStock;
    });
    return [leastStock];
  }
  return [];
};
