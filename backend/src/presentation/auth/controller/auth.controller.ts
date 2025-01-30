import {controller, httpPost} from "inversify-express-utils";
import {Request, Response} from "express";
import {validateEmailPassword} from "../../middlewares/validate.email-password";
import {sanitizeCreateUser} from "../../user/middlewares/sanitize.create-user";
import {RegisterUserInput} from "../../../domain/model/register-user.input";
import {inject} from "inversify";
import {RegisterUserUseCase} from "../../../domain/usecase/register-user.use-case";
import {sanitizeLoginUser} from "../middlewares/sanitize.login-user";
import {LoginUseCase} from "../../../domain/usecase/login.use-case";
import {rescue} from "../../rescue";
import {SaveRefreshTokenUseCase} from "../../../domain/usecase/save-refresh-token.use-case";
import {VerifyRefreshTokenUseCase} from "../../../domain/usecase/verify-refresh-token.use-case";
import {CreateAccessTokenUseCase} from "../../../domain/usecase/create-access-token.use-case";
import {authenticateJWT, authorize} from "../../middlewares/auth.middleware";

@controller('/auth')
export class AuthController {
  constructor(
    @inject(RegisterUserUseCase) private createUserUseCase: RegisterUserUseCase,
    @inject(LoginUseCase) private loginUseCase: LoginUseCase,
    @inject(SaveRefreshTokenUseCase) private saveRefreshTokenUseCase: SaveRefreshTokenUseCase,
    @inject(VerifyRefreshTokenUseCase) private verifyRefreshTokenUseCase: VerifyRefreshTokenUseCase,
    @inject(CreateAccessTokenUseCase) private createAccessTokenUseCase: CreateAccessTokenUseCase,
  ) {}

  private getUserIp(req: Request): string {
    const forwarded = req.headers["x-forwarded-for"];
    return typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket.remoteAddress || "Unknown";
  }

  @httpPost('/login', ...validateEmailPassword, sanitizeLoginUser)
  @rescue()
  async login(req: Request, res: Response) {
    const {email, password} = req.body;
    const result = await this.loginUseCase.execute(email, password);

    const token = this.createAccessTokenUseCase.execute(result.id);

    const expiresIn = '7h';
    const refreshToken = this.createAccessTokenUseCase.execute(result.id, expiresIn)

    const userIp = this.getUserIp(req);
    const userAgent = req.headers["user-agent"] || "Unknown";

    await this.saveRefreshTokenUseCase.execute({
      expiresIn: expiresIn,
      ip: userIp,
      refreshToken: refreshToken,
      userAgent: userAgent,
      userId: result.id,
    });

    console.log(token);
    return res.success("Login Succeed", result, {token});
  }

  @httpPost('/refresh-token', authorize)
  @rescue()
  async refreshToken(req: Request, res: Response) {
    const id = req.userModel.id;
    console.log(id);
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