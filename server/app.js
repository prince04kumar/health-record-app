const express = require('express');

const cors = require('cors');
const adminRouter = require('./routes/adminRoutes');
const patientRouter = require('./routes/patientRoutes');
const { connectDB } = require('./config/mongo');
const { connectCloudinary } = require('./config/cloudinary');



//app config
const app = express();
const port = process.env.PORT || 4000;


require('dotenv').config();
//middleware 
app.use(express.json());
app.use(cors());

connectDB();
connectCloudinary();



//api endpoints
app.use("/api/admin",adminRouter);
app.use("/api/user",patientRouter);
//localhost:4000/api/admin/addDoctor



app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

