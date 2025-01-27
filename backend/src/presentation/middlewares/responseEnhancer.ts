import {Request, Response, NextFunction} from "express";

export const responseEnhancer = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (
    message: string = "Success",
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.status(200).json({
      success: true,
      message,
      data,
      ...additionalProps,
    });
  };

  res.error = (
    message = "Bad Request",
    statusCode: number = 400,
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.status(statusCode).json({
      success: false,
      message,
      data,
      ...additionalProps,
    });
  };

  res.errorNotFound = (
    message = "Not Found",
    statusCode: number = 404,
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.error(message, statusCode, data, additionalProps);
  };

  res.errorBadRequest = (
    message = "Bad Request",
    statusCode: number = 400,
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.error(message, statusCode, data, additionalProps);
  };

  next();
};