import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../models/user";
import { tryCatch } from "../lib/tryCatch";

export class UserController {

    static getUserProfile = tryCatch(async function (req: Request, res: Response, next: NextFunction) {

        // return current user's profile
        const { id } = req.currentUser;
        const userRepo = appDataSource.getRepository(User);
        const userProfile = await userRepo.findOne({ where: { id: Number(id) } })

        return res.status(200).json({ message: "profile fetched successfully!", userProfile })
    })

}