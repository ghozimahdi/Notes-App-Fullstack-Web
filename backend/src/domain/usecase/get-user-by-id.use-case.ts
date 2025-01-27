import {inject, injectable} from "inversify";
import {UserModel} from "../model/user.model";
import {BadRequestException, NotFoundException} from "../model/exception";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject(AuthRepositoryDI.Name) private repository: AuthRepository
  ) {}

  async execute(id: string): Promise<UserModel> {
    if (!id) {
      throw new BadRequestException("The provided ID is invalid. Please provide an ID.");
    }

    const result = await this.repository.getUserById(id);
    if (!result.id) {
      throw new NotFoundException(`Note with id: ${id} not found`);
    }

    return result;
  }
}