import {controller, httpPost} from "inversify-express-utils";
import {Request, Response} from "express";
import {validateEmailPassword} from "../../middlewares/validateEmailPassword";
import {sanitizeCreateUser} from "../../user/middlewares/sanitizeCreateUser";
import {RegisterUserInput} from "../../../domain/model/register-user.input";
import {inject} from "inversify";
import {RegisterUserUseCase} from "../../../domain/usecase/register-user.use-case";
import {sanitizeLoginUser} from "../middlewares/sanitizeLoginUser";
import {LoginUseCase} from "../../../domain/usecase/login.use-case";
import {BadRequestException, EmailAlreadyRegisteredException} from "../../../domain/model/exception";

@controller('/auth')
export class AuthController {
  constructor(
    @inject(RegisterUserUseCase) private createUserUseCase: RegisterUserUseCase,
    @inject(LoginUseCase) private loginUseCase: LoginUseCase,
  ) {}

  @httpPost('/login', ...validateEmailPassword, sanitizeLoginUser)
  async login(req: Request, res: Response) {
    const {email, password} = req.body;
    const result = await this.loginUseCase.execute(email, password);

    if (!result.id) {
      return res.errorNotFound('Invalid email or password.');
    }

    return res.success("Login Succeed", result);
  }

  @httpPost('/register', sanitizeCreateUser, ...validateEmailPassword)
  async register(req: Request, res: Response) {
    try {
      const input: RegisterUserInput = req.body;

      const result = await this.createUserUseCase.execute(input);
      return res.success("Register Succeed", result);
    } catch (e) {
      if (e instanceof EmailAlreadyRegisteredException) {
        throw new BadRequestException('Email is already registered.');
      }

      throw e;
    }
  }
}