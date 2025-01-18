import React, { useState, useEffect } from "react";

const MedicationsPage = () => {
  const [showPopup, setShowPopup] = useState(true);

  const motivationalQuotes = [
    "Believe in yourself and all that you are.",
    "Your health is your wealth. Keep going!",
    "Every day is a chance to get stronger.",
    "Small steps every day lead to big results.",
    "Healing takes time, but you are getting there."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const medications = [
    { id: 1, name: "Paracetamol", status: "current", price: "$5", imageUrl: "https://assets.sayacare.in/api/images/product_image/large_image/23/74/paracetamol-500-mg-10-tablet-23_1.webp" },
    { id: 2, name: "Ibuprofen", status: "current", price: "$8", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/7/325863554/WI/JM/SY/135658020/ibuprofen-tablets-ip-200-mg-.jpg" },
    { id: 3, name: "Aspirin", status: "past", price: "$4", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/7/330506870/UM/GZ/QO/135658020/aspirin-dispersible-tablets.jpg" },
    { id: 4, name: "Amoxicillin", status: "past", price: "$12", imageUrl: "https://irp.cdn-website.com/69c0b277/dms3rep/multi/Amoxicillin+-+Uses-+Side+Effects-+Composition-+Indications+and+Price.jpg" },
    { id: 5, name: "Cough Syrup", status: "past", price: "$7", imageUrl: "https://images.apollo247.in/pub/media/catalog/product/a/l/alk0008.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%201200w" },
    { id: 6, name: "Vitamin C", status: "past", price: "$10", imageUrl: "https://www.thehimalayanorganics.in/cdn/shop/files/1_5ba26017-cd95-43ec-bcfd-ac4009f8f771.jpg?v=1733899306" },
    { id: 7, name: "Antihistamine", status: "current", price: "$6", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn1iL30Aa55TYIOESGmC1Lm4YJIovf2Yd7EQ&s" },
    { id: 8, name: "Pain Relief Gel", status: "past", price: "$9", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/4/411094199/QC/XX/EE/181075725/omnigel-pain-relief-cream.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Stay Motivated!</h2>
            <p className="text-lg text-gray-700">{randomQuote}</p>
            <button onClick={() => setShowPopup(false)} className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Close</button>
          </div>
        </div>
      )}

      <h1 className="text-6xl font-bold text-center mb-8 font-lora">Medications</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {medications.filter((med) => med.status === "current").map((med) => (
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

      <div>
        <h2 className="text-xl font-semibold mb-4">Past Medications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {medications.filter((med) => med.status === "past").map((med) => (
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
