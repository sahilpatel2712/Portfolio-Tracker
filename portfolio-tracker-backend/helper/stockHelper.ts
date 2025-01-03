import axios from "axios";
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
      investedAmount: Number(stock.averagePrice) * Number(stock.quantity),
      userId: userId,
    };
  });
  return updatedArray;
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
