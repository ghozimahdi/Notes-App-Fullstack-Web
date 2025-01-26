import {inject, injectable} from "inversify";
import {UserRepository, UserRepositoryDI} from "../repository/user.repository";
import {UserModel} from "../model/user.model";
import {BadRequestException, NotFoundException} from "../model/exception";

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject(UserRepositoryDI.Name) private repository: UserRepository
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