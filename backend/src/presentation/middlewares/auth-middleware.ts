import {Request, Response, NextFunction} from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    // todo: validate token Anda di sini...
    next();
};

export default authMiddleware;