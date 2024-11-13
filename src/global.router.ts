import { Router } from "express";
import authRouter from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import orderRouter from "./routes/order.routes";
import userRouter from "./routes/user.routes";
import { authenticate } from "./middlewares/auth";

// global router 

const globalRouter = Router();

globalRouter.use("/auth", authRouter);
globalRouter.use("/user", authenticate, userRouter);
globalRouter.use("/product", productRouter);
globalRouter.use("/order", authenticate, orderRouter);

export default globalRouter;

