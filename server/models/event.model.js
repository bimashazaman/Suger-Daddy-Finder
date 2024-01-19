const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  description: String,
  location: String,
  dateTime: Date,
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
