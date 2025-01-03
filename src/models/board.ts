import mongoose, { Document, Schema } from "mongoose";

export interface IBoard extends Document {
  name: string;
  participants: string[];
  data: string;
}

const BoardSchema: Schema = new Schema({
  name: { type: String, required: true },
  participants: { type: [String], default: [] },
  data: { type: String, default: "" },
});

export default mongoose.model<IBoard>("Board", BoardSchema);
