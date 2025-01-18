// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, default:"" },
  lastName: { type: String, default:"" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: Buffer },
  address: { type: Object, default: {line1:'',line2:''} },
  gender: {type: String, default: "Not Selected"},
  dob: {type: String, default: "Not Selected"},
  phone: {type: String, default: ''}

});

module.exports = mongoose.model('user', userSchema);
