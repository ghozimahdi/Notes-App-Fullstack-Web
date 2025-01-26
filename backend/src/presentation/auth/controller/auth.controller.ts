import {controller, httpGet, httpPost} from "inversify-express-utils";
import {NextFunction, Request, Response} from "express";
import {validateEmailPassword} from "../../middlewares/validateEmailPassword";
import {sanitizeCreateUser} from "../../user/middlewares/sanitizeCreateUser";
import {CreateUserInput} from "../../../domain/model/create-user.input";
import {handleError} from "../../../domain/model/exception";
import {inject} from "inversify";
import {CreateUserUseCase} from "../../../domain/usecase/create-user.use-case";

@controller('/auth')
export class AuthController {
  constructor(
    @inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
  ) {}

  @httpPost('/login', ...validateEmailPassword)
  async login(req: Request, res: Response, next: NextFunction) {}

  @httpPost('/register', sanitizeCreateUser, ...validateEmailPassword)
  async register(req: Request, res: Response) {
    try {
      const input: CreateUserInput = req.body;
      const result = await this.createUserUseCase.execute(input);
      return res.status(200).json({
        success: true,
        message: "Succeed",
        data: result,
      });
    } catch (e) {
      handleError("Failed to create an user", e);
    }

  }
}