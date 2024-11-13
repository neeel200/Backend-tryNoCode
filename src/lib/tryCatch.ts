import { NextFunction, Request, RequestHandler, Response } from "express";
import CustomError from "./customError";
import { ZodError } from "zod";

type C = (req: Request, res: Response, next: NextFunction) => Promise<any>

export function tryCatch(controller: C): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await controller(req, res, next);
        } catch (err) {
            if(err instanceof ZodError) {
                next(new CustomError(err.message, 422))
            }
            else if (err instanceof Error) {
                next(new CustomError(err.message, 500));
            } 
             
            else {
                next(err);

            }
        };
    }
}
