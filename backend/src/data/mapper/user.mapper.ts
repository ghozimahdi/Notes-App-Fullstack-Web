import {UserData} from "../model/user.data";
import {UserModel} from "../../domain/model/user.model";

export const userMapper = {
  mapFromData(userData: UserData | null): UserModel {
    return {
      address: userData?.address ?? '',
      createdAt: userData?.createdAt ?? '',
      email: userData?.email ?? '',
      role: userData?.role ?? undefined,
      username: userData?.username ?? '',
      id: userData?._id ?? ''
    };
  },
};