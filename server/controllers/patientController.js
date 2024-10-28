const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');


const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required for adding user" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
        }

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user data and save
        const userData = { name, email, password: hashedPassword };
        const newUser = new UserModel(userData);
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ email: newUser.email }, process.env.jwtSecret);

        // Send success response with token
        res.json({ message: "User added successfully", success: true, token });
        console.log("User added successfully", token);

    } catch (error) {
        console.error(`Error adding a new User: ${error.message}`);
        res.status(500).json({ message: "Server error", success: false });
    }
};


//api for User login


  const user = (req, res) =>{
    try{
        const{email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        //validate email
        if(!validator.isEmail(email)){
            return res.json({message: "Invalid email", success: false});
        }
        //find user by email
        UserModel.findOne({email}).then((user)=>{
            if(!user){
                return res.json({message: "Invalid email or password", success: false});
            }
            //compare password
            bcrypt.compare(password, user.password).then((isMatch)=>{
                if(!isMatch){
                    return res.json({message: "Invalid email or password", success: false});
                }
                //create token
                const token = jwt.sign({email: user.email, password: user.password}, process.env.jwtSecret);
                res.json({message: "Login successful", success: true, token: token});
                console.log("Login successful",token);
                
            })
        })
    }
    catch(error){
        console.error(`Error logging in: ${error.message}`);
        res.status(500).json({message: "Server error", success: false});
    }
  }

  module.exports = {addUser, user}