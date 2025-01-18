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
   
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [base64Image, setBase64Image] = useState('');
  const [error, setError] = useState('');

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // const handleImageUpload = async (event) => {
  //   try {
      
  //   } catch (err) {
  //     setError('Error processing image. Please try again.');
  //     console.error('Error:', err);
  //   }
  // };

  
  const getprofileimg = async () => {
    try {
      const resImage = await axios.get(
        'http://localhost:4000/api/user/patient-dashboard/profile/profileimage',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(resImage)
      setBase64Image(" ");

    }
    catch(err){
      console.log(err);
    }
  }
  
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
      
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
    getprofileimg();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'phone' ? value.replace(/0/g, '') : value,
    });
  };

 const handleImageUpload = async (e)=>{
  try{
    const file = event.target.files[0];
      
    if (!file) {
      setError('Please select an image file.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, etc.)');
      return;
    }

    const base64 = await convertToBase64(file);
    setBase64Image(base64);
    setError('');



        const imgres = await axios.put('http://localhost:4000/api/user/patient-dashboard/profile/updateuser',
         base64Image,
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
        );
        console.log(imgres.data);
  }
  catch(err){
    console.log(err);
  }
 }

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
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

        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Image Upload & Preview</h2>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full p-2 mb-4 border rounded-md bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
      
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
      
      {base64Image && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <img 
              src={base64Image} 
              alt="Uploaded preview" 
              className="max-w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Base64 String:</h3>
            <p className="text-sm break-all text-gray-700">
              {base64Image.substring(0, 100)}...
            </p>
          </div>
        </div>
      )}
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
