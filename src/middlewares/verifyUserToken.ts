import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyUserToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
