import {Request, Response, NextFunction} from "express";
import {Exception} from "../../domain/model/exception";

const errorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
  console.error("Error:", err.message);

  if (err instanceof Exception) {
    res.status(err.status).json({
      message: err.message,
      success: false,
      data: err.data || null,
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export default errorHandler;