// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
},
filepath: {
    type: String,
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
}
});

module.exports = mongoose.model('Report', reportSchema);
