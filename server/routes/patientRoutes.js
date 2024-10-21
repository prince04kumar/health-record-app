const express = require('express');
const {addUser} = require('../controllers/patientController');
const upload = require('../middleware/multer');
const {user} = require('../controllers/patientController');

const userRouter = express.Router();

userRouter.post('/addUser',  addUser);
userRouter.post('/UserLogin', user);

module.exports = userRouter;
