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
      ...(data !== null && {data}),
      ...additionalProps,
    });
  };

  res.error = (
    statusCode: number = 400,
    message = "Bad Request",
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.status(statusCode).json({
      success: false,
      message,
      ...(data !== null && {data}),
      ...additionalProps,
    });
  };

  res.errorServer = (
    message = "Internal Server Error",
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.error(500, message, data, additionalProps);
  };

  res.errorNotFound = (
    message = "Not Found",
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.error(404, message, data, additionalProps);
  };

  res.errorBadRequest = (
    message = "Bad Request",
    data: any = null,
    additionalProps: Record<string, any> = {}
  ) => {
    res.error(400, message, data, additionalProps);
  };

  next();
};