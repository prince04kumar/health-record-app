// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // image: { type: String, default:"" },
address: { type: Object, default: {line1:'',line2:''} },
gender: {type: String, default: "Not Selected"},
dob: {type: String, default: "Not Selected"},
phone: {type: String, default: ''}
//   reports: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Report'
//   }]
});

module.exports = mongoose.model('user', userSchema);
