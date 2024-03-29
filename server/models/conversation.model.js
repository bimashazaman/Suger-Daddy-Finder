import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastMessage: String,
  lastMessageTimestamp: Date,
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
