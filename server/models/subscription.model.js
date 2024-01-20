import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stripeSubscriptionId: { type: String, required: true },
  status: { type: String, required: true }, // active, past_due, cancelled, etc.
  createdAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
