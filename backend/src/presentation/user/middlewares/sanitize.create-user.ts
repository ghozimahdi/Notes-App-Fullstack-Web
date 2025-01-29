import {NextFunction, Request, Response} from "express";

export const sanitizeCreateUser = (req: Request, _: Response, next: NextFunction) => {
  const allowedFields = ['username', 'email', 'password'];
  Object.keys(req.body).forEach((key) => {
    if (!allowedFields.includes(key)) {
      delete req.body[key];
    }
  });
  next();
};
