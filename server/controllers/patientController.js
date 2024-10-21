const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');


const addUser = async (req, res )=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required for adding user"});
            
        }
        //validate email
        if(!validator.isEmail(email)){
            return res.json({message: "Invalid email",success: false})

        }
        //validate password
        if(password.length < 6){
            return res.json({message: "Password must be at least 6 characters", success: false});
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name ,
            email,
            password: hashedPassword
        }
        const newUser = new UserModel(userData);
        newUser.save().then((user)=>{
            res.json({
                message: "user added successfully", success : true
            })
            console.log("user added successfully");
        }).catch((error)=>{
            console.error(`Error adding a new User: ${error.message}`);
            res.status(500).json({message: "Server error" , success: false});
        })



    }catch(error){
        console.error(`Error adding a new User: ${error.message}`);
        res.status(500).json({message: "Server error" , success: false});
  

    }
}

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
                
            })
        })
    }
    catch(error){
        console.error(`Error logging in: ${error.message}`);
        res.status(500).json({message: "Server error", success: false});
    }
  }

  module.exports = {addUser, user}