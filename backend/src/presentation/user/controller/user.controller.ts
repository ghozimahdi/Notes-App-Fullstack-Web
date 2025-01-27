import {inject} from "inversify";
import {controller, httpGet} from "inversify-express-utils";
import {Request, Response} from "express";
import {handleError} from "../../../domain/model/exception";
import {GetUserByIdUseCase} from "../../../domain/usecase/get-user-by-id.use-case";
import validateObjectId from "../../middlewares/validateObjectId";

@controller('/user')
export class UserController {
  constructor(
    @inject(GetUserByIdUseCase) private getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @httpGet('/:id', validateObjectId)
  async getUserById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const result = await this.getUserByIdUseCase.execute(id);
      return res.success(result);
    } catch (e) {
      handleError("Failed to fetch an user", e);
    }
  }
}