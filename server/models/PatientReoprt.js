// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  note: String,
  patientId: mongoose.Schema.Types.ObjectId, // Link to the patient
});

module.exports = mongoose.model('Report', reportSchema);
