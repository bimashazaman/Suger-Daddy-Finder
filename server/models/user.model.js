import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profile: {
      age: Number,
      gender: String,
      interests: [String],
      bio: String,
      photos: [String],
      profilePicture: String,
      coverPicture: String,
    },
    accountType: { type: String, enum: ["sugarbaby", "sugardaddy"] },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    preferences: {},
    privacySettings: {},
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

export default User;
