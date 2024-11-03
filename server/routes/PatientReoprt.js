const express = require('express');
const { addUser, user } = require('../controllers/patientController');
const { addfile, getAllReports, downloadFile, deleteFile } = require('../controllers/reportController');
const fs = require('fs');
const upload = require('../middleware/multer');
const userRouter = express.Router();
const path = require('path');

userRouter.post('/addUser', addUser);
userRouter.post('/UserLogin', user);
userRouter.post('/patient-dashboard/reports/upload', upload.single('file'), addfile);
userRouter.get('/patient-dashboard/reports', getAllReports);
userRouter.get('/patient-dashboard/reports/download/:filename', downloadFile);
userRouter.delete('/patient-dashboard/reports/delete/:filename', deleteFile);

module.exports = userRouter;