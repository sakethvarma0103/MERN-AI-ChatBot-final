// models/User.ts
import mongoose, { Document, Types } from "mongoose";
import { BookSchema, IBook } from "./Books.js";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  books: Types.DocumentArray<IBook>;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  books: [BookSchema],
});

export default mongoose.model<IUser>("User", UserSchema);
