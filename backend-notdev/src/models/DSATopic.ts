import mongoose, { Document, Schema } from 'mongoose';
import IDSATopic from '../interfaces/dsatopic.interface';
const DSATopicSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  totalQuestions: { type: Number, default: 0 },
  easy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  medium: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  hard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const DSATopic = mongoose.model<IDSATopic>('DSATopic', DSATopicSchema);
export default DSATopic;
