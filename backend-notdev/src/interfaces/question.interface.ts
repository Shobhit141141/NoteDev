import mongoose, { Document } from "mongoose";

export default interface IQuestion extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topicId: mongoose.Types.ObjectId;
  topic:string;
  tag: string[];
  links: {
    leetcode?: string;
    gfg?: string;
    codeforces?: string;
  };
  images?: string[];
  code?: string;
  text: string;
  solutionLink: string;
  youtubeLink: string;
  createdBy:string
}
