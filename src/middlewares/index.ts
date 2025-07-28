// auth middleware for password hashing and checking?

import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

// Extend Express Request interface to include userid


const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  if (header.startsWith("Bearer ")) {
    try {
      const decoded = jwt.verify(header.split(" ")[1], JWT_SECRET) as JwtPayload;
      if (typeof decoded === "object" && "userid" in decoded) {
        req.query.userid = decoded.userid as string;
        next();
      } else {
        res.status(403).json({
          message: "Invalid token payload",
          header,
        });
      }
    } catch (error) {
      res.status(403).json({
        message: "Invalid token",
        error,
        header,
      });
    }
  }
};

export { auth };
