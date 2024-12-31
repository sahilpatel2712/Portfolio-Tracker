import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Token missing" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token!, process.env.JWT_SECRET!);
    if (!payload) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (typeof payload === "object" && "id" in payload) {
      req.user = { id: payload.id as string };
      next();
      return;
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized: Invalid token structure" });
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
