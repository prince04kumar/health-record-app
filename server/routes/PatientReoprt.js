const express = require('express');
const { addUser, user } = require('../controllers/patientController');
const { addfile, getAllReports, downloadFile, deleteFile } = require('../controllers/reportController');
const fs = require('fs');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth.js');
const path = require('path');

const userRouter = express.Router();
userRouter.post('/addUser', addUser);
userRouter.post('/UserLogin', user);
userRouter.post('/patient-dashboard/reports/upload', auth, upload.single('file'), addfile);
userRouter.get('/patient-dashboard/reports', auth, getAllReports);
userRouter.get('/patient-dashboard/reports/download/:filename', auth, downloadFile);
userRouter.delete('/patient-dashboard/reports/delete/:filename', deleteFile);

module.exports = userRouter;