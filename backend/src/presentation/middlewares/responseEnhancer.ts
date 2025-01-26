import {Request, Response, NextFunction} from "express";

export const responseEnhancer = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (message = "Success", data = null, additionalProps = {}) => {
    res.status(200).json({
      success: true,
      message,
      data,
      ...additionalProps,
    });
  };

  res.error = (
    message = "Error",
    statusCode = 400,
    data = null,
    additionalProps = {}
  ) => {
    res.status(statusCode).json({
      success: false,
      message,
      data,
      ...additionalProps,
    });
  };

  next();
};