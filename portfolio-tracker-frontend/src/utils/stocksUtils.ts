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

export const numberToCurrency = (amount: number | string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount));
};
export const formatAmount = (amount: number | string) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
};

export const stockFilter = (
  stocksData: StockDataType[],
  searchText: string
) => {
  const searched = stocksData.filter((stock) =>
    stock.stockName.toLowerCase().includes(searchText.toLowerCase())
  );
  searched.sort((a, b) => {
    const indexA = a.stockName.toLowerCase().indexOf(searchText.toLowerCase());
    const indexB = b.stockName.toLowerCase().indexOf(searchText.toLowerCase());
    return indexA - indexB;
  });

  return searched;
};

export const findPortfolioSummary = (stocksData: StockDataType[]) => {
  let totalInvestment = 0,
    totalCurrentPrice = 0;
  stocksData.forEach((stock) => {
    totalInvestment += Number(stock.investedAmount);
    totalCurrentPrice += (Number(stock.currentPrice) * Number(stock.quantity));
  });
  const difference = (totalCurrentPrice - totalInvestment).toFixed(2);

  return {
    totalCurrentPrice: totalCurrentPrice.toFixed(2),
    totalInvestment: totalInvestment.toFixed(2),
    difference,
  };
};

export const updateStockChange = (
  stocksData: StockDataType[],
  updatedStock: StockDataType
) => {
  if (updatedStock.id.trim()) {
    const newStocksData = stocksData.map((stock) =>
      stock.id === updatedStock.id ? updatedStock : stock
    );
    return newStocksData;
  }
  return stocksData;
};

