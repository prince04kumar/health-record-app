import React, { useState } from 'react';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Prince',
    lastName: 'Kumar',
    username: 'princkum4666',
    email: 'princesocial04@gmail.com',
    mobile: '+91 7307567443',
    pronouns: 'He/Him/His',
    profilePhoto: '', // Default profile photo URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePhoto: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Basic Details</h2>

        {/* Profile Photo Section */}
        <div className="mb-4 text-center">
          <img
            src={formData.profilePhoto}
            alt="Profile"
            className="w-32 h-32 bg-black rounded-full mx-auto mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block mx-auto"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Add other form fields here */}
      </div>
    </div>
  );
};

export default UserProfileForm;