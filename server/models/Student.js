const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  rollNumber: { type: Number, required: true },
  address: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  height: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  parentName: { type: String, required: true },
  parentContact: { type: String, required: true },
  phone: { type: String },
  enrollmentDate: { type: Date, required: true, default: Date.now },
  emergencyContact: { type: String },
  nationality: { type: String },
  previousSchool: { type: String },
  profilePicture: { type: String },
  feesStructure: { type: mongoose.Schema.Types.ObjectId, ref: 'Feestructure', required: true },
  fines: [{
    amount: { type: Number, required: true },
    reason: { type: String, required: true }
  }],
  feesStatus: { type: String, default: 'pending' },
  session: { type: String, required: true },
  admissionStatus: { type: String, default: 'old' },
  paymentType: { type: String },
  totalPaid: { type: Number, default: 0 },
  pendingFees: { type: Number, default: 0 },
  paymentDetails: {
    paymentType: { type: String },
    month: { type: String },
    quota: { type: String },
    feesPaid: {
      tuitionFee: { type: Number },
      developmentFee: { type: Number },
      diaryFee: { type: Number },
      magazineFee: { type: Number },
      busFee: { type: Number },
    },
    totalPaid: { type: Number },
  }
});

module.exports = mongoose.model('Student', StudentSchema);
