// FeesStructure.js
const mongoose = require('mongoose');

const FeesStructureSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,unique: true
  },
  tuitionFee: {
    type: Number,
    required: true,
  },
  developmentFee: {
    type: Number,
    required: true,
  },
  diaryFee: {
    type: Number,
    required: true,
  },
  magazineFee: {
    type: Number,
    required: true,
  },
  admissionFee: {
    type: Number,
    required: true,
  },
  busFee: {
    type: Number,
    required: true,
  },
  cautionMoney: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Feestructure', FeesStructureSchema);
