// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  filedata: {
    type: Buffer,
    required: true
  },
  filetype: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  sectionId: {
    type: String, // Change to String to match the client-side UUID
    required: true
  }
});

module.exports = mongoose.model('Report', reportSchema);