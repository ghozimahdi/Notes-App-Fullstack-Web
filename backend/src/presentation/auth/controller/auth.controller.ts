import {controller, httpPost} from "inversify-express-utils";
import {Request, Response} from "express";
import {validateEmailPassword} from "../../middlewares/validate.email-password";
import {sanitizeCreateUser} from "../../user/middlewares/sanitize.create-user";
import {RegisterUserInput} from "../../../domain/model/register-user.input";
import {inject} from "inversify";
import {RegisterUserUseCase} from "../../../domain/usecase/register-user.use-case";
import {sanitizeLoginUser} from "../middlewares/sanitize.login-user";
import {LoginUseCase} from "../../../domain/usecase/login.use-case";
import {BadRequestException, EmailAlreadyRegisteredException} from "../../../domain/model/exception";
import {rescue} from "../../rescue";
import jwt from "jsonwebtoken";
import {appConfig} from "../../../config/env";

@controller('/auth')
export class AuthController {
  constructor(
    @inject(RegisterUserUseCase) private createUserUseCase: RegisterUserUseCase,
    @inject(LoginUseCase) private loginUseCase: LoginUseCase,
  ) {}

  @httpPost('/login', ...validateEmailPassword, sanitizeLoginUser)
  @rescue()
  async login(req: Request, res: Response) {
    const {email, password} = req.body;
    const result = await this.loginUseCase.execute(email, password);

    if (!result.user.id) {
      return res.errorNotFound('Invalid email or password.');
    }

    return res.success("Login Succeed", result.user, {
      token: result.token,
    });
  }

  @httpPost('/refresh-token', ...validateEmailPassword, sanitizeLoginUser)
  @rescue()
  async refreshToken(req: Request, res: Response) {
    //todo: create refresh token
    //todo: create flexible schema with static method mongodb

    return res.success('Succeed');
  }

  @httpPost('/logout', ...validateEmailPassword, sanitizeLoginUser)
  @rescue()
  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.errorServer('Logout Failed')
      }

      return res.success("Logout Succeed");
    });
  }

  @httpPost('/register', sanitizeCreateUser, ...validateEmailPassword)
  @rescue()
  async register(req: Request, res: Response) {
    const input: RegisterUserInput = req.body;

    const result = await this.createUserUseCase.execute(input);
    return res.success("Register Succeed", result);
  }
}