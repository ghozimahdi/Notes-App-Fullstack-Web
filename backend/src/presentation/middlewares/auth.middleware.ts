import {Request, Response, NextFunction} from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).json({error: 'Unauthorized'});
      return;
    }

    // todo: validate token Anda di sini...
    next();
  } catch (e) {
    next(e);
  }
};

export default authMiddleware;