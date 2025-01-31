import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {appConfig} from "../../config/env";
import {UserModel} from "../../domain/model/user.model";

const passportAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", {session: false}, (err: any, user: UserModel) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.error(401, 'Unauthorized');
    }

    req.userModel = user;
    next();
  })(req, res, next);
};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.error(401, 'Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, appConfig.jwtSecret, (err, decoded) => {
      if (err) {
        return res.error(401, 'Unauthorized: Invalid token');
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    res.errorServer()
  }
};

export {passportAuth};