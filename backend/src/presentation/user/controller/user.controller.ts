import {inject} from "inversify";
import {controller, httpGet, httpPost} from "inversify-express-utils";
import {NextFunction, Request, Response} from "express";
import {handleError} from "../../../domain/model/exception";
import {GetUserByIdUseCase} from "../../../domain/usecase/get-user-by-id.use-case";
import {CreateUserUseCase} from "../../../domain/usecase/create-user.use-case";
import {CreateUserInput} from "../../../domain/model/create-user.input";
import validateObjectId from "../../middlewares/validateObjectId";
import {sanitizeCreateUser} from "../middlewares/sanitizeCreateUser";
import {validateEmailPassword} from "../../middlewares/validateEmailPassword";

@controller('/user')
export class UserController {
  constructor(
    @inject(GetUserByIdUseCase) private getUserByIdUseCase: GetUserByIdUseCase,
    @inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
  ) {}

  @httpGet('/:id', validateObjectId)
  async getUserById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const result = await this.getUserByIdUseCase.execute(id);
      return res.success(undefined, result);
    } catch (e) {
      handleError("Failed to fetch an user", e);
    }
  }

  @httpPost('/', sanitizeCreateUser, ...validateEmailPassword)
  async createUser(req: Request, res: Response) {
    try {
      const input: CreateUserInput = req.body;
      const result = await this.createUserUseCase.execute(input);
      return res.success(undefined, result);
    } catch (e) {
      handleError("Failed to create an user", e);
    }
  }

}