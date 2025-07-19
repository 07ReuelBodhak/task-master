import mongoose, { Document, Schema, Types } from "mongoose";
import "@/model/Tasks";

export interface BoardDocument extends Document {
  user_id: string;
  title: string;
  short_detail: string;
  tasks: Types.ObjectId[];
  createdAt: Date;
}

const BoardSchema = new Schema<BoardDocument>({
  user_id: { type: String, required: true },
  title: { type: String, default: "My Daily Task" },
  short_detail: { type: String, default: "Task to be organized" },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Board ||
  mongoose.model<BoardDocument>("Board", BoardSchema);
