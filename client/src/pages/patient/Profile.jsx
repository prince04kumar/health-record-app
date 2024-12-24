import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    dob: '',
    profilePhoto: '',
  });

  const [countryCode, setCountryCode] = useState('+91');

  const getUserData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/user/patient-dashboard/profile',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFormData({
        firstName: response.data.user.firstName || '',
        lastName: response.data.user.lastName || '',
        email: response.data.user.email || '',
        phone: response.data.user.phone || '',
        gender: response.data.user.gender || '',
        address: response.data.user.address || '',
        dob: response.data.user.dob || '',
        profilePhoto: response.data.user.profilePhoto || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'phone' ? value.replace(/0/g, '') : value,
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

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:4000/api/user/patient-dashboard/profile/updateuser',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('User updated:', response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Basic Details</h2>

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

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
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
            <label className="block text-sm font-medium mb-2">Phone</label>
            <div className="flex">
              <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="border border-gray-300 rounded-l-lg p-2"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-r-lg p-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
