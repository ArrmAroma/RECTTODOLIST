import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  name: string;
  date_start: Date;
  finished: boolean;
}

const TodoSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  date_start: { type: Date, required: true },
  finished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<ITodo>('Todo', TodoSchema);