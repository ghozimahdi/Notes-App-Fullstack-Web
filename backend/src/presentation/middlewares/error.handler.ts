import {NextFunction, Request, Response} from "express";
import {Exception} from "../../domain/model/exception";
import {appConfig, Flavor} from "../../config/env";

const errorHandler = (err: any, req: Request, res: Response, _: NextFunction) => {
  const isDevelopmentMode = appConfig.flavor !== Flavor.PRODUCTION;
  if (isDevelopmentMode) {
    console.error(`[${req.method}] ${req.url} - Error:`, err.message);
  }

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
      error: isDevelopmentMode ? err.message : undefined,
    });
  }
};

export default errorHandler;