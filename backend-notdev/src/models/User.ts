import mongoose, { Schema, Document } from "mongoose";
import UserInterface from "../interfaces/user.interface";

const userSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  picture: { type: String, default: "https://i.pinimg.com/originals/68/28/4c/68284c53b5f4d7d94cd40fa19c9fd21d.jpg" },
  createdAt: { type: Date, default: Date.now },
  token: { type: String },
  createdTime: { type: String }
});

interface UserModel extends UserInterface, Document {}

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
