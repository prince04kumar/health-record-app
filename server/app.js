const express = require('express');

const cors = require('cors');
// const adminRouter = require('./routes/adminRoutes');
const patientRouter = require('./routes/PatientReoprt');
const path = require('path');
const { connectDB } = require('./config/mongo');
const { connectCloudinary } = require('./config/cloudinary');



//app config
const app = express();
const port = process.env.PORT || 4000;


require('dotenv').config();
//middleware 

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' || 'http://localhost:5174' || 'https://health-record-app-frontend.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

connectDB();
// connectCloudinary();



//api endpoints
// app.use("/api/admin",adminRouter);
app.use("/api/user",patientRouter);

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Server error',
        error: err.message
    });
});


app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

