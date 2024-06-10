import mongoose, { Schema, Document } from 'mongoose';
import UserInterface from '../interfaces/user.interface';

const userSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  picture: { type: String, default: 'DEFAULT_PICTURE_URL' }, // Replace DEFAULT_PICTURE_URL with your default URL
});

interface UserModel extends UserInterface, Document {}

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
