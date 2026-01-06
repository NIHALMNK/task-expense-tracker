import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  status: "pending" | "completed";
  dueDate?: Date;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    dueDate: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
