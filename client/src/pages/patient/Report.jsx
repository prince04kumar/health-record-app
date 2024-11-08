import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaUpload, FaFileAlt, FaImage } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState('');

  const allReports = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/user/patient-dashboard/reports');
      setReports(response.data);
      console.log('Reports:', response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    allReports();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/patient-dashboard/reports/download/${filename}`, {
        responseType: 'blob',
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
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('note', note);

        console.log('Uploading file:', selectedFile.name);

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
        setNote('');
        console.log('Upload response:', response.data);
        allReports();
      } catch (error) {
        console.error('Upload error details:', error.response?.data || error.message);
        alert('Error uploading file: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleDelete = (filename) => {
    const deleteReport = async () => {
      try {
        const deleteReport = await axios.delete(`http://localhost:4000/api/user/patient-dashboard/reports/delete/${filename}`);
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
              <div key={report._id} className="bg-white rounded-lg shadow-md p-6">
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
                    onClick={() => handleDelete(report.filename)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">Uploaded on: {report.date}</p>
                <p className="text-sm text-gray-800 mb-4">{report.note}</p>
                <button
                  onClick={() => handleDownload(report.filename)}
                  className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Download
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


// Report.js (React component)
// const Report = () => {
//   // ... existing state declarations ...

//   // Get the auth token from wherever you store it (localStorage, context, etc.)
//   const authToken = localStorage.getItem('token'); // or however you store your token

//   // Add auth headers to your axios requests
//   const axiosConfig = {
//     headers: {
//       'Authorization': `Bearer ${authToken}`
//     }
//   };

//   const allReports = async () => {
//     try {
//       const response = await axios.get(
//         'http://localhost:4000/api/user/patient-dashboard/reports',
//         axiosConfig
//       );
//       setReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       try {
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         formData.append('note', note);

//         const response = await axios.post(
//           'http://localhost:4000/api/user/patient-dashboard/reports/upload',
//           formData,
//           {
//             ...axiosConfig,
//             headers: {
//               ...axiosConfig.headers,
//               'Content-Type': 'multipart/form-data',
//             },
//             onUploadProgress: (progressEvent) => {
//               const percentCompleted = Math.round(
//                 (progressEvent.loaded * 100) / progressEvent.total
//               );
//               console.log('Upload progress:', percentCompleted, '%');
//             },
//           }
//         );
//         // ... rest of the upload handling code ...
//       } catch (error) {
//         // ... error handling ...
//       }
//     }
//   };

//   const handleDelete = (filename) => {
//     const deleteReport = async () => {
//       try {
//         await axios.delete(
//           `http://localhost:4000/api/user/patient-dashboard/reports/delete/${filename}`,
//           axiosConfig
//         );
//         allReports();
//       } catch (error) {
//         console.error('Error deleting report:', error);
//       }
//     };
//     deleteReport();
//   };

//   const handleDownload = async (filename) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/api/user/patient-dashboard/reports/download/${filename}`,
//         {
//           ...axiosConfig,
//           responseType: 'blob',
//         }
//       );
//       // ... rest of download handling code ...
//     } catch (error) {
//       console.error('Error downloading file:', error);
//     }
//   };

//   // ... rest of your component code ...
// };


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTrash, FaUpload, FaFileAlt, FaImage, FaSpinner } from 'react-icons/fa';

// const Report = () => {
//   const [reports, setReports] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [note, setNote] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   // Get auth token from localStorage
//   const token = localStorage.getItem('token');

//   // Axios config with auth header
//   const axiosConfig = {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   const allReports = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         'http://localhost:4000/api/user/patient-dashboard/reports',
//         axiosConfig
//       );
//       setReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//       alert('Error fetching reports. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     allReports();
//   }, []);

//   const handleDownload = async (filename) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/api/user/patient-dashboard/reports/download/${filename}`,
//         {
//           ...axiosConfig,
//           responseType: 'blob',
//         }
//       );
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', filename);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error downloading file:', error);
//       alert('Error downloading file. Please try again.');
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) { // 10MB limit
//         alert('File size must be less than 10MB');
//         e.target.value = '';
//         return;
//       }
//       setSelectedFile(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('note', note);

//       const response = await axios.post(
//         'http://localhost:4000/api/user/patient-dashboard/reports/upload',
//         formData,
//         {
//           ...axiosConfig,
//           headers: {
//             ...axiosConfig.headers,
//             'Content-Type': 'multipart/form-data',
//           },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       setSelectedFile(null);
//       setNote('');
//       setUploadProgress(0);
//       allReports();
//       alert('File uploaded successfully!');
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('Error uploading file: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (filename) => {
//     if (!window.confirm('Are you sure you want to delete this report?')) return;

//     try {
//       setLoading(true);
//       await axios.delete(
//         `http://localhost:4000/api/user/patient-dashboard/reports/delete/${filename}`,
//         axiosConfig
//       );
//       alert('Report deleted successfully');
//       allReports();
//     } catch (error) {
//       console.error('Error deleting report:', error);
//       alert('Error deleting report. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-md p-6">
//         <h1 className="text-3xl font-bold text-gray-800">My Reports</h1>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Upload Section */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload New Report</h2>
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="file-upload"
//                 accept="image/*,.pdf"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
//               >
//                 <FaUpload className="mr-2" />
//                 Choose File
//               </label>
//               <input
//                 type="text"
//                 placeholder="Add a note (optional)"
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 className="border rounded-md px-3 py-2 flex-grow"
//               />
//               <button
//                 onClick={handleUpload}
//                 disabled={!selectedFile || loading}
//                 className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//               >
//                 {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaUpload className="mr-2" />}
//                 Upload
//               </button>
//             </div>
//             {selectedFile && (
//               <div className="mt-2 text-sm text-gray-600">
//                 <p>Selected file: {selectedFile.name}</p>
//                 {uploadProgress > 0 && uploadProgress < 100 && (
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                     <div
//                       className="bg-blue-600 h-2.5 rounded-full"
//                       style={{ width: `${uploadProgress}%` }}
//                     ></div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Reports Grid */}
//           {loading && !reports.length ? (
//             <div className="flex justify-center items-center py-8">
//               <FaSpinner className="animate-spin text-3xl text-blue-500" />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {reports.map((report) => (
//                 <div key={report._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center">
//                       {report.filetype.includes('pdf') ? (
//                         <FaFileAlt className="text-red-500 text-xl mr-2" />
//                       ) : (
//                         <FaImage className="text-blue-500 text-xl mr-2" />
//                       )}
//                       <h3 className="text-lg font-semibold text-gray-800 truncate">
//                         {report.filename}
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(report.filename)}
//                       className="text-red-500 hover:text-red-700 transition duration-300"
//                       title="Delete report"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-2">
//                     Uploaded on: {formatDate(report.uploadDate)}
//                   </p>
//                   {report.note && (
//                     <p className="text-sm text-gray-800 mb-4">{report.note}</p>
//                   )}
//                   <button
//                     onClick={() => handleDownload(report.filename)}
//                     className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
//                   >
//                     Download
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* No Reports Message */}
//           {!loading && reports.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">No reports found. Upload your first report!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Report;