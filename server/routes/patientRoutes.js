const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const   
 { addUser } = require('../controllers/patientController');
const upload = require('../middleware/multer'); // Assuming it configures single or multiple file uploads
const { user } = require('../controllers/patientController');
const { Report, gridfsBucket } = require('../models/reportModel'); // Assuming Report model and gridfsBucket setup

// Configure Multer for file uploads (assuming you want GridFS storage)
const storage = new GridFsStorage({
  url: yourMongoDBConnectionString, // Replace with your actual connection string
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const contentType = file.mimetype;
      resolve({ filename, contentType });
    });
  },
  options: { useUnifiedTopology: true, autoIndex: true }, // Optional GridFS options
});

const uploadMiddleware = multer({ storage }); // Replace with upload if it handles single/multiple uploads

// User router with upload route
const userRouter = express.Router();

userRouter.post('/addUser', addUser);
userRouter.post('/UserLogin', user);

userRouter.post('/upload', uploadMiddleware.single('file'), async (req, res) => {
  // Check for uploaded file
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const { note, patientId } = req.body;

  try {
    // Create new report using retrieved file details from GridFS
    const newReport = new Report({
      filename: req.file.id, // Use GridFS file ID for filename
      contentType: req.file.contentType,
      note,
      patientId,
    });

    await newReport.save();
    res.status(201).send(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file');
  }
});

module.exports = userRouter;