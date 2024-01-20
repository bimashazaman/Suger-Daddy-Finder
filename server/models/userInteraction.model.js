import mongoose from "mongoose";

const userInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  interactedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interactionType: {
    type: String,
    enum: ["like", "dislike", "view", "super like"],
    required: true,
  },
  stripeCustomerId: { type: String },
  timestamp: { type: Date, default: Date.now },
  isMutual: { type: Boolean, default: false }, // to track if the "like" is mutual
});

// Ensure that the combination of userId and interactedUserId is unique for a particular interactionType
userInteractionSchema.index(
  { userId: 1, interactedUserId: 1, interactionType: 1 },
  { unique: true }
);

const UserInteraction = mongoose.model(
  "UserInteraction",
  userInteractionSchema
);

export default UserInteraction;
