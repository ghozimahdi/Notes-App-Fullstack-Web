export class UserModel {
  id: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  createdAt: string = '';
  role: number = 0;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}