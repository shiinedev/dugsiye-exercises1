import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
