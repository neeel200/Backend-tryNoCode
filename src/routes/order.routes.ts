
/**
 create order
 show all orders
 */

import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const orderRouter = Router();

/* /api/order */

orderRouter.post("/", OrderController.createOrder);
orderRouter.get("/allorders", OrderController.showAllOrders);

export default orderRouter