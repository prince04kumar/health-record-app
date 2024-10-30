const mongoose = require('mongoose');
const Report = require('../models/Reoprt');
const { GridFSBucket } = require('mongodb');


const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/health-app`
    ).then(() => {
      console.log('Connected to MongoDB');
    }).catch((error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);

    });


  }

  catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }








};

exports.connectDB = connectDB;