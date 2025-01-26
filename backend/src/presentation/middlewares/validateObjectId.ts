import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import {BadRequestException} from "../../domain/model/exception";

const validateObjectId = (req: Request, _: Response, next: NextFunction) => {
  try {
    const id = req.params['id'];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestException(`Invalid ID format for parameter: id`));
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateObjectId;