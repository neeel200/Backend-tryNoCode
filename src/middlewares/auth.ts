import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { CurrentUserType } from "..";
import { tryCatch } from "../lib/tryCatch";
import CustomError from "../lib/customError";
dotenv.config({ path: "../.env" });

export const authenticate = tryCatch(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const token = req.cookies["X-auth-token"];
    if (!token) {
        return next(new CustomError("Unauthorized", 401))
    }
    const decode = jwt.verify(token, String(process.env.JWT_SECRET));
    if (!decode) {
        return next(new CustomError("Unauthorized", 401))
    }
    req.currentUser = decode as CurrentUserType
    next();
});