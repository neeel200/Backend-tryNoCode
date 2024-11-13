import express, { NextFunction, Request, Response } from "express";
import ErrorHandler from "./lib/errorHandler";
import dotenv from "dotenv"
import customError from "./lib/customError";
import { appDataSource } from "./dataSource";
import globalRouter from "./global.router";
dotenv.config({path:".env"})

const port = process.env.PORT;

export class Server {
    private app = express();
    startServer() {
        this.app.use(express.json());

        this.app.use("/api", globalRouter)

        this.app.get("/", (req, res) => {
            res.send("Working!");
        });
        
        // Error handlers
        this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
            next(new customError(`Cant find the ${req.originalUrl}`, 404));
        });
        
        this.app.use(ErrorHandler)
        
        // initialize the db and server
        appDataSource.initialize().then(()=>{
            
            this.app.listen(port, () => console.log("DataSource initialized and Server is running on port: ", port));

        }).catch((err)=>{

            console.log("ERROR Occured:", err)
        });
    }
}

// server instantiation
new Server().startServer();

