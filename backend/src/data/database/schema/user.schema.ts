import {Schema, Document} from "mongoose";
import bcrypt from "bcrypt";
import {UserData} from "../../model/user.data";

interface IUserSchema extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: string;
  address: string;
  role: number;

  comparePassword(password: string): Promise<boolean>;

  findByCredentials(
    email: string,
    password: string
  ): Promise<UserData>;
}

const UserSchema: Schema = new Schema<IUserSchema>({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: String,
    required: [true, "Created At is required"],
  },
  address: {
    type: String,
    default: "",
    required: false,
  },
  role: {
    type: Number,
    default: 0,
    required: false,
  },
});

UserSchema.pre<IUserSchema>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default UserSchema;
