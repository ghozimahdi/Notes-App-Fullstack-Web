import {inject} from "inversify";
import {controller, httpGet} from "inversify-express-utils";
import {Request, Response} from "express";
import {GetUserByIdUseCase} from "../../../domain/usecase/get-user-by-id.use-case";
import validateObjectId from "../../middlewares/validate.object-id";
import {rescue} from "../../rescue";
import {passportAuth} from "../../middlewares/auth.middleware";

@controller('/user')
export class UserController {
  constructor(
    @inject(GetUserByIdUseCase) private getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @httpGet('/:id', validateObjectId, passportAuth)
  @rescue('Failed to fetch an user')
  async getUserById(req: Request, res: Response) {
    const id = String(req.params.id);
    const result = await this.getUserByIdUseCase.execute(id);
    return res.success(result);
  }
}