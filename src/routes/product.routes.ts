/*
create product
show all products
 */
import {Router} from "express"
import { ProductController } from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth";

const productRouter = Router();

/* /api/product */

productRouter.post("/", authenticate, ProductController.createProduct);
productRouter.get("/allproducts", ProductController.showAllProducts)

export default productRouter;