import { DataSource } from "typeorm";
import dotenv from "dotenv"
import { User } from "./models/user";
import { Role } from "./models/role";
import { Product } from "./models/product";
import { Order } from "./models/order";
dotenv.config({path:__dirname+"/.env"})

const { DB_PASSWORD, DB_USERNAME, DB_HOST_NAME } = process.env;

export const appDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST_NAME,
    port: 3306,
    password: DB_PASSWORD,
    username: DB_USERNAME,
    database: "EcommerceDB",
    // synchronize: true,
    // dropSchema: true,
    entities: [User, Role, Product, Order]
});