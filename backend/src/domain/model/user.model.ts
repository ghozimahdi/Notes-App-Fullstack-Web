export class UserModel {
  id: string = '';
  username: string = '';
  email: string = '';
  password?: string = undefined;
  address: string = '';
  createdAt: string = '';
  role?: number = undefined;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}