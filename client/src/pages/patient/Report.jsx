import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaUpload, FaFileAlt, FaImage, FaFolder, FaEdit, FaSave } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState('');
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [selectedSection, setSelectedSection] = useState('');

  const allReports = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/user/patient-dashboard/reports', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
      setReports(response.data);
      console.log('Reports:', response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/user/patient-dashboard/sections', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSections(response.data);
      console.log('Sections:', response.data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  useEffect(() => {
    allReports();
    fetchSections();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/patient-dashboard/reports/download/${filename}`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile && selectedSection) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('note', note);
        formData.append('sectionId', selectedSection);

        console.log('Uploading file:', selectedFile.name);

        const response = await axios.post(
          'http://localhost:4000/api/user/patient-dashboard/reports/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
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
        setNote('');
        console.log('Upload response:', response.data);
        allReports();
      } catch (error) {
        console.error('Upload error details:', error.response?.data || error.message);
        alert('Error uploading file: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert('Please select a section to upload the file.');
    }
  };

  const handleDelete = (filename) => {
    const deleteReport = async () => {
      try {
        const deleteReport = await axios.delete(`http://localhost:4000/api/user/patient-dashboard/reports/delete/${filename}`, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }

        );
        console.log('Report deleted:', deleteReport.data);
        allReports();
      } catch (error) {
        console.error('Error deleting report:', error);
      }
    };
    deleteReport();
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleCreateSection = async () => {
    if (newSectionName.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/user/patient-dashboard/sections', {
          name: newSectionName
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        const newSection = response.data;
        setSections([...sections, newSection]);
        setNewSectionName('');
        setSelectedSection(newSection._id);
      } catch (error) {
        console.error('Error creating section:', error);
      }
    }
  };

  const handleEditSection = (id) => {
    setEditingSection(id);
  };

  const handleSaveSection = async (id, newName) => {
    try {
      await axios.put(`http://localhost:4000/api/user/patient-dashboard/sections/${id}`, {
        name: newName
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSections(sections.map(section => section._id === id ? { ...section, name: newName } : section));
      setEditingSection(null);
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const handleDeleteSection = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/patient-dashboard/sections/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSections(sections.filter(section => section._id !== id));
    } catch (error) {
      console.error('Error deleting section:', error);
    }
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
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="border rounded-md px-3 py-2 w-full sm:w-auto"
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section._id} value={section._id}>{section.name}</option>
                ))}
              </select>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !selectedSection}
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

          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Section</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Section name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                className="border rounded-md px-3 py-2 w-full sm:w-auto"
              />
              <button
                onClick={handleCreateSection}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Create
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div key={section._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  {editingSection === section._id ? (
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => handleSaveSection(section._id, e.target.value)}
                      className="border rounded-md px-3 py-2 w-full"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold">{section.name}</h3>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditSection(section._id)}
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                    >
                      {editingSection === section._id ? <FaSave /> : <FaEdit />}
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {reports.filter(report => report.sectionId === section._id).map((report) => (
                    <div key={report._id} className="bg-gray-100 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          {report.filetype === 'application/pdf' ? (
                            <FaFileAlt className="text-red-500 mr-2" />
                          ) : (
                            <FaImage className="text-blue-500 mr-2" />
                          )}
                          <h4 className="text-md font-semibold">{report.filename}</h4>
                        </div>
                        <button
                          onClick={() => handleDelete(report.filename)}
                          className="text-red-500 hover:text-red-700 transition duration-300"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Uploaded on: {new Date(report.uploadDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-800 mb-4">{report.note}</p>
                      <button
                        onClick={() => handleDownload(report.filename)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

