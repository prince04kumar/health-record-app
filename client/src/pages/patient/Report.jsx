import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaUpload, FaFileAlt, FaImage } from 'react-icons/fa';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    // Fetch reports from API
    // For now, we'll use dummy data
    setReports([
      { id: 1, name: 'Blood Test', type: 'pdf', date: '2023-04-01', note: 'Annual checkup' },
      { id: 2, name: 'X-Ray', type: 'image', date: '2023-03-15', note: 'Chest X-ray' },
    ]);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Report.jsx
const handleUpload = async () => {
  if (selectedFile) {
      try {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('note', note);

          console.log('Uploading file:', selectedFile.name); // Debug log

          const response = await axios.post(
              'http://localhost:4000/api/user/patient-dashboard/reports/upload',
              formData,
              {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
                  onUploadProgress: (progressEvent) => {
                      const percentCompleted = Math.round(
                          (progressEvent.loaded * 100) / progressEvent.total
                      );
                      console.log('Upload progress:', percentCompleted, '%');
                  },
              }
          );
          setSelectedFile(null);
          setNote(" ");
          console.log('Upload response:', response.data);
          // Handle successful upload
          
      } catch (error) {
          console.error('Upload error details:', error.response?.data || error.message);
          alert('Error uploading file: ' + (error.response?.data?.message || error.message));
      }
  }
};

  const handleDelete = (id) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0 bg-white shadow-md p-4">
        <h1 className="text-3xl font-bold">Patient Reports</h1>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        <div className="container mx-auto">
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upload New Report</h2>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <FaUpload className="mr-2" />
                Choose File
              </label>
              <input
                type="text"
                placeholder="Add a note (optional)"
                value={note}
                onChange={handleNoteChange}
                className="border rounded-md px-3 py-2 w-full sm:w-auto"
              />
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {report.type === 'pdf' ? (
                      <FaFileAlt className="text-red-500 mr-2" />
                    ) : (
                      <FaImage className="text-blue-500 mr-2" />
                    )}
                    <h3 className="text-lg font-semibold">{report.name}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">Uploaded on: {report.date}</p>
                <p className="text-sm text-gray-800 mb-4">{report.note}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
