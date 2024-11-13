import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { CurrentUserType } from "..";
import { tryCatch } from "../lib/tryCatch";
dotenv.config({ path: "../.env" });

export const authenticate = tryCatch(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decode = jwt.verify(token, String(process.env.JWT_SECRET));
    if (!decode) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.currentUser = decode as CurrentUserType
    next();
});