import React from "react";

const MedicationsPage = () => {
  // Sample data for medications
  const medications = [
    { id: 1, name: "Paracetamol", status: "current", imageUrl: "/meds/paracetamol.jpg" },
    { id: 2, name: "Ibuprofen", status: "current", imageUrl: "/meds/ibuprofen.jpg" },
    { id: 3, name: "Aspirin", status: "past", imageUrl: "/meds/aspirin.jpg" },
    { id: 4, name: "Amoxicillin", status: "past", imageUrl: "/meds/amoxicillin.jpg" },
    { id: 5, name: "Cough Syrup", status: "past", imageUrl: "/meds/cough_syrup.jpg" },
    { id: 6, name: "Vitamin C", status: "past", imageUrl: "/meds/vitamin_c.jpg" },
    { id: 7, name: "Antihistamine", status: "current", imageUrl: "/meds/antihistamine.jpg" },
    { id: 8, name: "Pain Relief Gel", status: "past", imageUrl: "/meds/pain_relief.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Medications</h1>

      {/* Current Medications Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {medications
            .filter((med) => med.status === "current")
            .map((med) => (
              <div key={med.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={med.imageUrl} alt={med.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{med.name}</h3>
                  <p className="text-sm text-gray-600">Price: {med.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Past Medications Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Medications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {medications
            .filter((med) => med.status === "past")
            .map((med) => (
              <div key={med.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={med.imageUrl} alt={med.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{med.name}</h3>
                  <p className="text-sm text-gray-600">Price: {med.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;
