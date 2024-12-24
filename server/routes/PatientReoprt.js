const express = require('express');
const { addUser, user, getUserData, updateUser } = require('../controllers/patientController');
const { addfile, getAllReports, downloadFile, deleteFile } = require('../controllers/reportController');
const { createSection, getSections, updateSection, deleteSection } = require('../controllers/sectionController');
const { getschedule, createschedule } = require('../controllers/appointmentcontrols');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth.js');
const path = require('path');

const userRouter = express.Router();
userRouter.post('/addUser', addUser);
userRouter.post('/UserLogin', user);
userRouter.post('/patient-dashboard/reports/upload', auth, upload.single('file'), addfile);
userRouter.get('/patient-dashboard/reports', auth, getAllReports);
userRouter.get('/patient-dashboard/reports/download/:filename', auth, downloadFile);
userRouter.delete('/patient-dashboard/reports/delete/:filename', auth, deleteFile);
userRouter.get('/patient-dashboard/profile', auth, getUserData);
userRouter.put('/patient-dashboard/profile/updateuser', auth, updateUser);

// Section routes
userRouter.post('/patient-dashboard/sections', auth, createSection);
userRouter.get('/patient-dashboard/sections', auth, getSections);
userRouter.put('/patient-dashboard/sections/:id', auth, updateSection);
userRouter.delete('/patient-dashboard/sections/:id', auth, deleteSection);


//appointment routes

userRouter.get('/patient-dashboard/appointment_display', auth, getschedule);
userRouter.post('/patient-dashboard/appointment_create', auth, createschedule);

module.exports = userRouter;