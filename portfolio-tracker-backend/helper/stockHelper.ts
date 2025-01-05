import prisma from "../db";
import { StockValueType } from "./zodSchema";
import { stocksArray } from "./stockArray";
import { finnhubApiService } from "./finnhubApiService";

export const addManyStocks = async (
  stocksData: StockValueType[],
  userId: string
) => {
  try {
    const newStockData = calculateInvestmentAmount(stocksData, userId);
    return await prisma.stocks.createMany({ data: newStockData });
  } catch (error) {
    throw error;
  }
};

export const calculateInvestmentAmount = (
  stocksData: StockValueType[],
  userId: string
) => {
  const updatedArray = stocksData.map((stock) => {
    return {
      ...stock,
      investedAmount: investedAmountCal(stock.averagePrice, stock.quantity),
      userId: userId,
    };
  });
  return updatedArray;
};

export const investedAmountCal = (
  averagePrice: string | number,
  quantity: string | number
) => {
  return Number((Number(averagePrice) * Number(quantity)).toFixed(2));
};

export const addRandomStocks = async (userId: string) => {
  try {
    const enrichedStocks = await Promise.all(
      stocksArray.map(async (stock) => {
        const response = await finnhubApiService(stock.ticker);

        const averagePrice = response.data.c;

        return {
          ...stock,
          userId,
          averagePrice,
        };
      })
    );

    await addManyStocks(enrichedStocks, userId);
    return enrichedStocks;
  } catch (error) {
    console.error("Error while fetching stock data:", error);
    throw error;
  }
};

export const calculateStocksProfit = async (stock: {
  id: string;
  stockName: string;
  ticker: string;
  quantity: number;
  averagePrice: number;
  investedAmount: number;
}) => {
  try {
    const response = await finnhubApiService(stock.ticker);

    const currentPrice = response.data.c as number;
    const currentTotalValue = currentPrice * stock.quantity;
    const overall = (currentTotalValue - stock.investedAmount).toFixed(2);
    const isProfit = currentTotalValue >= stock.investedAmount;

    return {
      ...stock,
      currentPrice: currentPrice.toFixed(2),
      overall,
      isProfit,
    };
  } catch (error) {
    console.error(`Error fetching data for ticker: ${stock.ticker}`, error);
    throw error;
  }
};

export const searchStockData = async (ticker: string) => {
  try {
    const stockData = await finnhubApiService(ticker);

    const processedStocks = {
      ticker: ticker,
      currentPrice: stockData.data.c || 0,
      d: stockData.data.d || 0,
      dp: (stockData.data?.dp && stockData.data?.dp.toFixed(2)) || "",
      isUp: stockData.data.d >= 0,
    };
    return processedStocks;
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
  }
};
