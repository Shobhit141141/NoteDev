import mongoose, { Document, Schema } from "mongoose";
import IQuestion from "../interfaces/question.interface";

const QuestionSchema: Schema = new Schema({
  title: { type: String },
  description: { type: String },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DSATopic",
  },
  tag: [{ type: String }],
  links: {
    leetcode: { type: String },
    gfg: { type: String },
    codeforces: { type: String },
  },
  text: { type: String },
  code: { type: String },
  solutionLink: { type: String },
  youtubeLink: { type: String },
  images: [{ type: String }],
  createdBy: { type: String, ref: "User" },
});

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
export default Question;
