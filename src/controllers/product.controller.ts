import { NextFunction, Request, RequestHandler, Response } from "express";
import { Product } from "../models/product";
import { appDataSource } from "../dataSource";
import { tryCatch } from "../lib/tryCatch";
import { z } from "zod";

const productCreationPayload = z.object({
    price: z.number(),
    stock: z.number(),
    description: z.string(),
    name: z.string()
})

export class ProductController{

    static createProduct = tryCatch(async function (req: Request, res:Response, next:NextFunction) {
        // validating the body
        productCreationPayload.parse(req.body)

        const {name, description, price, stock} = req.body;

        //create a new product
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.stock = stock;

        const productRepo = appDataSource.getRepository(Product);

        await productRepo.save(newProduct);
        return res.status(200).json({message: "product created successfully!"});
        
    })
    static showAllProducts = tryCatch(async function(req: Request, res:Response, next:NextFunction) {
      
        const productRepo = appDataSource.getRepository(Product);
        const allProducts = await productRepo.find();
        
        return res.status(200).json({message: "Users fetched successfully!", data : allProducts})
    })
  
}
