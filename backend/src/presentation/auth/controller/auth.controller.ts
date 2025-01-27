import {controller, httpGet, httpPost} from "inversify-express-utils";
import {NextFunction, Request, Response} from "express";
import {validateEmailPassword} from "../../middlewares/validateEmailPassword";
import {sanitizeCreateUser} from "../../user/middlewares/sanitizeCreateUser";
import {CreateUserInput} from "../../../domain/model/create-user.input";
import {handleError} from "../../../domain/model/exception";
import {inject} from "inversify";
import {CreateUserUseCase} from "../../../domain/usecase/create-user.use-case";
import {sanitizeLoginUser} from "../middlewares/sanitizeLoginUser";
import bcrypt from 'bcrypt'

@controller('/auth')
export class AuthController {
  constructor(
    @inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
  ) {}

  @httpPost('/login', ...validateEmailPassword, sanitizeLoginUser)
  async login(req: Request, res: Response) {
    return res.success("Login Succeed");
  }

  @httpGet('/test')
  async test(req: Request, res: Response) {
    res.cookie('token', '1234567890abc')
    res.cookie('userId', '1234567890abc', {signed: true})

    req.session.isLoggedIn = true;

    res.redirect('/api/auth/test1')
  }

  @httpGet('/test1')
  async test1(req: Request, res: Response) {
    console.log(`Session IsLogin = ${req.session.isLoggedIn}`)

    const hashPassword = async (pw: string) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pw, salt);
      console.log(salt);
      console.log(hash);
    }

    const checking = async (pw: string, hashedPW: string) => {
      const result = await bcrypt.compare(pw, hashedPW);

      if (result) {
        console.log('Success')
      } else {
        console.log('Incorect password')
      }
    }

    await hashPassword('fiesta'); // $2b$10$SfaUeZuCvm0BbHoAsohwW.YSorSQBIh97WkuX9GovpDTgi6w8FdA6
    await checking('fiesta', '$2b$10$SfaUeZuCvm0BbHoAsohwW.YSorSQBIh97pWkuX9GovpDTgi6w8FdA6')

    return res.success("Login Succeed");
  }

  @httpPost('/register', sanitizeCreateUser, ...validateEmailPassword)
  async register(req: Request, res: Response) {
    try {
      const input: CreateUserInput = req.body;
      const result = await this.createUserUseCase.execute(input);
      return res.success("Register Succeed", result);
    } catch (e) {
      handleError("Failed to create an user", e);
    }

  }
}