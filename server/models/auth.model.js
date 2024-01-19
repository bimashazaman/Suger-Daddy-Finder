const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    authToken: String,
    refreshToken: String,
    expiresIn: Date,
    deviceInfo: String,
    lastLogin: Date,
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
