import {UserData} from "../model/user.data";
import {UserModel} from "../../domain/model/user.model";
import {CreateUserInput} from "../../domain/model/create-user.input";

export const userMapper = {
  mapFromData(userData: UserData | null): UserModel {
    return {
      address: userData?.address ?? '',
      createdAt: userData?.createdAt ?? '',
      email: userData?.email ?? '',
      password: userData?.password ?? undefined,
      role: userData?.role ?? undefined,
      username: userData?.username ?? '',
      id: userData?._id ?? ''
    };
  },
  mapFromDomain(input: CreateUserInput): Partial<UserData> {
    return {
      _id: input.id,
      username: input.username,
      role: input.role,
      password: input.password,
      email: input.email,
      createdAt: input.createdAt,
      address: input.address,
    };
  },
};