const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    medicalInfo: { type: String, required: true },
    photo: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 }, // 24 hours
});

module.exports = mongoose.model('Appointment', appointmentSchema);
