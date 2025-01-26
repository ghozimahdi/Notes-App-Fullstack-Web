export class UserData {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  address?: string;
  createdAt?: string;
  role?: number;

  constructor(init?: Partial<UserData>) {
    Object.assign(this, init);
  }
}