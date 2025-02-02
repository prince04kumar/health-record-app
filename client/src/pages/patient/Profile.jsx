import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';

const UserProfileForm = () => {
  const { userEmail, setUserEmail } = useContext(UserContext);  const [formData, setFormData] = useState({
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
  const [user, setUser] = useState(formData.firstName);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getprofileimg = async () => {
    try {
      const resImage = await axios.get(
        '/api/user/patient-dashboard/profile/profileimage',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setBase64Image(resImage.data.user.profileImage);
     // console.log(resImage.data.user.profileImage);
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
  
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
  
    //  console.log('Uploading image:', base64); // Debugging log
  
      const imgres = await axios.put(
        '/api/user/patient-dashboard/profile/updateimage',
        { profileImage: base64 }, // Send as an object with a profileImage field
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      //console.log('Image upload response:', imgres.data); // Debugging log
  
      if (imgres.data.success) {
        alert('Image uploaded successfully');
      }
    } catch (err) {
      setError('Failed to upload image');
      console.error('Error uploading image:', err); // Debugging log
    }
  };



  const getUserData = async () => {
    try {

      const response = await axios.get(
        '/api/user/patient-dashboard/profile',
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
      setUserEmail(response.data.user.email);
      console.log("profile" , userEmail);
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

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        '/api/user/patient-dashboard/profile/updateuser',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Profile updated successfully');
      // Store email in localStorage
      localStorage.setItem('userEmail', formData.email);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Your Profile</h2>
         <div className="m-8 flex flex-col justify-center items-center gap-6"> <div className="rounded-ful">
            <img src={base64Image} alt="" className='max-h-40' />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className=" p-2 mb-4 border rounded-md bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
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
