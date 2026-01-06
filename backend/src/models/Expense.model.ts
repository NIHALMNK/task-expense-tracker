import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExpense extends Document {
  userId: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  expenseDate: Date;
}

const ExpenseSchema: Schema<IExpense> = new Schema(
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
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true
    },
    expenseDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
