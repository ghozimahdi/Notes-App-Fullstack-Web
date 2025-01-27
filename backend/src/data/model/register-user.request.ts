export class RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  address: string;
  role: number;

  constructor(
    username: string,
    email: string,
    password: string,
    address: string,
    role: number
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
    this.role = role;
  }
}