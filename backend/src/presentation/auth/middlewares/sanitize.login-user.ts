import {NextFunction, Request, Response} from "express";

export const sanitizeLoginUser = (req: Request, _: Response, next: NextFunction) => {
  const allowedFields = ['email', 'password'];
  Object.keys(req.body).forEach((key) => {
    if (!allowedFields.includes(key)) {
      delete req.body[key];
    }
  });
  next();
};
