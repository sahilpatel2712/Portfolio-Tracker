import { Request, Response } from "express";
import {
  stockSchema,
  StockValueType,
  updateStockSchema,
  UpdateStockValueType,
} from "../helper/zodSchema";
import prisma from "../db";

export const getStocks = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const userStocks = await prisma.stocks.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        stockName: true,
        ticker: true,
        averagePrice: true,
        quantity: true,
        investedAmount: true,
      },
    });
    res
      .status(201)
      .json({ message: "Portfolio fetch successfully", portfolio: userStocks });
  } catch (error) {
    console.log("error in get stock", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addStocks = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const body: StockValueType = req.body;
  const validation = stockSchema.safeParse(body);
  if (!validation.success) {
    const errorDetails = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    res.status(400).json({ message: errorDetails[0].message });
    return;
  }
  try {
    const investedAmount = Number(body.averagePrice) * Number(body.quantity);
    await prisma.stocks.create({
      data: {
        stockName: body.stockName,
        ticker: body.ticker,
        quantity: body.quantity,
        averagePrice: body.averagePrice,
        investedAmount: investedAmount,
        userId: userId as string,
      },
    });
    res.status(201).json({ message: "Stock add in portfolio" });
  } catch (error) {
    console.log("error in add stock", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStocks = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Stock ID is required" });
    return;
  }
  const body: UpdateStockValueType = req.body;

  const validation = updateStockSchema.safeParse(body);
  if (!validation.success) {
    const errorDetails = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    res
      .status(400)
      .json({ message: "Validation failed", errors: errorDetails[0].message });
    return;
  }

  try {
    const investedAmount = Number(body.averagePrice) * Number(body.quantity);
    const updatedStock = await prisma.stocks.update({
      where: { id: id, userId: userId },
      data: { ...body, investedAmount: investedAmount },
    });
    if (!updatedStock) {
      res.status(404).json({ message: "Stock not found" });
      return;
    }
    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    console.log("error in update stock", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteStocks = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Stock ID is required" });
    return;
  }
  try {
    const deletedStock = await prisma.stocks.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!deletedStock) {
      res.status(404).json({ message: "Stock not found" });
      return;
    }
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.log("error in delete stock", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
