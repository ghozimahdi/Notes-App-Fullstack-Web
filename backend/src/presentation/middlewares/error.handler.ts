import {Request, Response, NextFunction} from "express";
import {Exception} from "../../domain/model/exception";

const errorHandler = (err: any, req: Request, res: Response, _: NextFunction) => {
  console.error(`[${req.method}] ${req.url} - Error:`, err.message);

  if (err instanceof Exception) {
    res.status(err.status).json({
      success: false,
      message: err.message,
      data: err.data || null,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export default errorHandler;