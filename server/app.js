const express = require('express');

const cors = require('cors');
// const adminRouter = require('./routes/adminRoutes');
const patientRouter = require('./routes/PatientReoprt');
const path = require('path');
const { connectDB } = require('./config/mongo');
const { connectCloudinary } = require('./config/cloudinary');
const bodyParser = require('body-parser');


//app config
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


require('dotenv').config();
//middleware 

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:5173', 'https://health-record-app-six.vercel.app/'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use(cors(corsOptions));

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

