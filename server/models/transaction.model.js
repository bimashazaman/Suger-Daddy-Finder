const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["subscription", "gift"] },
  amount: Number,
  timestamp: { type: Date, default: Date.now },
  status: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
