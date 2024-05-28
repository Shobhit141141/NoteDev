import mongoose, { Document, Schema } from 'mongoose';


export default interface IDSATopic extends Document {
  title: string;
  image:string;
  questions: mongoose.Types.ObjectId[];
  totalQuestions: number;
  easy: mongoose.Types.ObjectId[];
  medium: mongoose.Types.ObjectId[];
  hard: mongoose.Types.ObjectId[];
}
