import { NextFunction, Request, RequestHandler, Response } from "express";
import { tryCatch } from "../lib/tryCatch";
import { Encrypt } from "../lib/helpers";
import { User } from "../models/user";
import { Role } from "../models/role";
import { appDataSource } from "../dataSource";
import CustomError from "../lib/customError";
import {z} from 'zod'

const registrationPayload = z.object({
    name: z.string().max(50).min(1),
    email: z.string().email(),
    password: z.string().max(100).min(5)
}).strict()

export class AuthController {

    static register = tryCatch(async function (req: Request, res: Response, next: NextFunction) {
        //validating register payload
        registrationPayload.parse(req.body)

        const { name, email, password } = req.body;

        const encryptedPassword = await Encrypt.encryptPassword(password)

        const user = new User();
        user.username = name;
        user.email = email;
        user.password = encryptedPassword;

        const defaultRole: 'user' | 'admin' = 'user';

        const userRepo = appDataSource.getRepository(User)

        const roleRepo = appDataSource.getRepository(Role);
        const roleExists = await roleRepo.findOne({ where: { name: defaultRole } })

        var resp;
        if (roleExists) {
            user.role = roleExists;
            resp = await userRepo.save(user);
        } else {
            const role = new Role();
            role.name = defaultRole;
            role.description = "This is a default user role.";
            resp = await Promise.all([roleRepo.save(role), userRepo.save(user)])
        }


        return res.status(201).json({ message: "User Registered successfully", resp })

    })

    static login = tryCatch(async function (req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        // return token only if user found and passwords matched
        const userRepo = appDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email: email } });
        if (!user) {
            return next(new CustomError("User not found!", 404));
        }

        if (!Encrypt.comparePassword(user.password, password)) {
            return next(new CustomError("Incorrect password!", 400));
        }

        const token = Encrypt.generateToken({ id: user.id });

        return res.status(200).json({ message: "User logged in successfully", token });
    })

    static logout = tryCatch(async function (req: Request, res: Response, next: NextFunction) {
        // invalidate the user session
    })
}