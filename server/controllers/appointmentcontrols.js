const Appointment = require('../models/AppointmentModel');

// Get all appointments
const getschedule = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createschedule = async (req, res) => {
    const newAppointment = new Appointment({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        medicalInfo: req.body.medicalInfo,
        photo: req.body.photo,
        appointmentDate: req.body.appointmentDate,
    });

    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getschedule,
    createschedule,
};