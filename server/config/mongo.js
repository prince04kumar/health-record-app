const mongoose = require('mongoose');

const connectDB = async () => {
    
   mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
   })

    await mongoose.connect(`${process.env.MONGO_URI}/health-record` )



}

exports.connectDB = connectDB