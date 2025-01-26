import {NextFunction, Request, Response} from "express";
import {body, validationResult} from 'express-validator';
import {BadRequestException} from "../../domain/model/exception";

export const validateEmailPassword = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({min: 8}).trim().escape(),
  (req: Request, _: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new BadRequestException(undefined, {errors: errors.array()}));
    }
    next();
  },
];