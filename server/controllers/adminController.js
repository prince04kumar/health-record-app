
const validator = require('validator');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const DoctorModel = require('../models/DoctorsModel.js');
const jwt = require('jsonwebtoken');

//api for adding a new doctor
const addDoctor = async (req, res) => {
    try{
            const{name,email,password } = req.body;
            // const imageFile = req.file;

           
            if(!name || !email || !password ){
                return res.status(400).json({message: "All fields are required"});
            }
            //validate email
            if(!validator.isEmail(email)){
                return res.json({message: "Invalid email", success: false});
            }
            //validate password
            if(password.length < 6){
                return res.json({message: "Password must be at least 6 characters", success: false});
            }
            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //upload image to cloudinary
            // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            // const imageUrl = imageUpload.secure_url;

            const doctorData = {
                name,
                email,
                password: hashedPassword,
                // image: imageUrl
                //speciality,degree , experience , about, available, fees , address , date , slotes_booked
                //for address we need to using  JSON parse (ADDRESS);
            }
            const newDoctor = new DoctorModel(doctorData);
           newDoctor.save().then((doctor) => {
               res.json({message: "Doctor added successfully", success: true});
               console.log("Doctor added successfully");
           }).catch((error) => {
                console.error(`Error adding a new doctor: ${error.message}`);
                res.status(500).json({message: "Server error", success: false});    
           })
   
        }
    catch(error){
        console.error(`Error adding a new doctor: ${error.message}`);
        res.status(500).json({message: "Server error" , success: false});
    }
    }

    //api for admin login

    const admin = (req , res) => {
        try{
            const {email , password} = req.body;
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
              const token  = jwt.sign(email+password , process.env.jwtSecret, );
                res.json({message: "Login successful", success: true, token});
            }
            else{
                res.json({message: "Invalid credentials", success: false});
            }

        }
        catch(error){
            console.error(`Error logging in: ${error.message}`);
            res.status(500).json({message: "Server error" , success: false});
        }
    }


   module.exports = {addDoctor , admin};
    
    
    
    
//    image , speciality,degree , experience , about, available, fees , address , date , slotes_booked
    
    