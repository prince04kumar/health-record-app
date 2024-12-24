import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const Appointment_display = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch appointments from the database
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/api/user/');
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Appointments</h2>
                {appointments.length > 0 ? (
                    <ul>
                        {appointments.map((appointment) => (
                            <li key={appointment.id} className="mb-4 p-4 border border-gray-300 rounded-md">
                                <p><strong>Name:</strong> {appointment.name}</p>
                                <p><strong>Age:</strong> {appointment.age}</p>
                                <p><strong>Gender:</strong> {appointment.gender}</p>
                                <p><strong>Medical Info:</strong> {appointment.medicalInfo}</p>
                                <p><strong>Appointment Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>
        </div>
    );
};

export default Appointment_display;