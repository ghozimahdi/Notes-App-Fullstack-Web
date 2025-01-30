import {Request, Response, NextFunction} from "express";
import logger from "../../config/logger";

export const requestLogger = (req: Request, _: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
};