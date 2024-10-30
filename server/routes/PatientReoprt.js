const express = require('express');

const{ addUser , user} = require('../controllers/patientController');
const{ addfile} = require('../controllers/reportController');

const upload= require('../middleware/multer');
// User router with upload route
const userRouter = express.Router();

const path = require('path');



userRouter.post('/addUser', addUser);
userRouter.post('/UserLogin', user);

// userRouter.get('/patient-dashboard/reports',getfile);
userRouter.post('/patient-dashboard/reports/upload',upload.single('file'),addfile);




module.exports = userRouter;