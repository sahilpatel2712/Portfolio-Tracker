import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  signinSchema,
  SigninValuesType,
  signupSchema,
  SignupValuesType,
} from "../helper/zodSchema";
import prisma from "../db";
import { addRandomStocks } from "../helper/stockHelper";

export const getUserDetail = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const userDetail = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        username: true,
      },
    });
    if (!userDetail) {
      res.status(401).json({ message: "User not found" });
    }
    res
      .status(201)
      .json({ message: "user detail found successfully", payload: userDetail });
  } catch (error) {
    console.log("error in user detail fetch", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signupController = async (req: Request, res: Response) => {
  const body: SignupValuesType = req.body;
  const validation = signupSchema.safeParse(body);
  if (!validation.success) {
    const errorDetails = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    res.status(400).json({ message: errorDetails[0].message });
    return;
  }
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (findUser) {
      res.status(403).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const savedUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        username: body.username,
      },
    });
    const token = jwt.sign(
      { id: savedUser.id, email: savedUser.email },
      process.env.JWT_SECRET!
    );
    await addRandomStocks(savedUser.id);
    res
      .status(201)
      .json({ message: "User signup successfully", payload: { token: token } });
    return;
  } catch (error) {
    console.log("error in signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signinController = async (req: Request, res: Response) => {
  const body: SigninValuesType = req.body;
  const validation = signinSchema.safeParse(body);

  if (!validation.success) {
    const errorDetails = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    res.status(400).json({ message: errorDetails[0].message });
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!
    );
    res
      .status(200)
      .json({ message: "Signin successful", payload: { token: token } });
  } catch (error) {
    console.log("error in signin", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
