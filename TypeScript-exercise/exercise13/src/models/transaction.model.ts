import mongoose, {Schema} from "mongoose";
import { ITransaction } from "../types/transaction";

const transactionSchema = new Schema<ITransaction>(
  {
    title: String,
    amount: Number,
    type: {
      type: String,
      enum: ["expense", "income"],
      default: "expense",
    },
    category: String,
    date: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>("Transaction",transactionSchema)

export default Transaction