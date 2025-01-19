import {Request, Response, NextFunction} from 'express';

const errorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
};

export default errorHandler;