import { model, ObjectId, Schema } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  password: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  email: String,
  username: String,
  password: String,
  avatar: String,
});

const User = model<IUser>("User", userSchema);
export { User };
