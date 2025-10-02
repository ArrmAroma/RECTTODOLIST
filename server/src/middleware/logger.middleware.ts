import { logger } from "../config/loggerConfig";
import { Request , Response , NextFunction } from "express";

export const loggerMiddleware = async(req:Request , res:Response , next : NextFunction ) => {
    logger.http(`${req.method} : ${req.url}`);
    logger.http(`Header : ${JSON.stringify(req.headers)}}`);
    logger.http(`Body : ${JSON.stringify(req.body)}}`);
    next();
}