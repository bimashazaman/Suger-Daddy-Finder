const mongoose = require("mongoose");

const financialAgreementSchema = new mongoose.Schema({
  sugarDaddyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sugarBabyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  terms: String,
  startDate: Date,
  endDate: Date,
  status: String,
  lastUpdated: { type: Date, default: Date.now },
});

const FinancialAgreement = mongoose.model(
  "FinancialAgreement",
  financialAgreementSchema
);

module.exports = FinancialAgreement;
