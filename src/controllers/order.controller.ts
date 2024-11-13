import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../dataSource";
import { Product } from "../models/product";
import CustomError from "../lib/customError";
import { Order } from "../models/order";
import { User } from "../models/user";
import { tryCatch } from "../lib/tryCatch";
import { z } from "zod";

const orderCreationPayload = z.object({
    productID: z.number(),
    quantity: z.number().min(1),
    total_price: z.number()
})

export class OrderController {

    static createOrder = tryCatch(async function(req: Request, res: Response, next: NextFunction) {
        // Validating body
        orderCreationPayload.parse(req.body)

        const { productID, quantity, total_price } = req.body;
        const { id } = req.currentUser;

        const userRepo = appDataSource.getRepository(User);

        const user = await userRepo.findOne({
            where: {
                id: id
            }
        })

        // if product exists then create order otherwise throw error
        const productRepo = appDataSource.getRepository(Product);
        const productExists = await productRepo.findOne({ where: { id: Number(productID) } });

        if (!productExists) {
            return next(new CustomError("Product Not found for the requested Order!", 400))
        }

        const newOrder = new Order();
        newOrder.quantity = quantity;
        newOrder.total_price = total_price;
        newOrder.product = productExists;
        newOrder.user = user as User;

        const orderRepo = appDataSource.getRepository(Order);
        await orderRepo.save(newOrder);

        return res.status(200).json({ message: "Order created successfully!" });
    })

    static showAllOrders = tryCatch(async function(req: Request, res: Response, next: NextFunction) {
        const { id } = req.currentUser;

        // return all orders corresponding to a user 
        const orderRepo = appDataSource.getRepository(Order);
        const allUserOrders = await orderRepo.find({where: {user_id: id}})

        return res.status(200).json({message:"Orders fetched successfully!", data:allUserOrders})
    })

}