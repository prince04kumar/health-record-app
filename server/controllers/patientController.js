const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const UserProfile = require('../models/userprofile');

const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check for required fields
        if (!username || !email || !password) {
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
        const userData = { username, email, password: hashedPassword };
        const newUser = new UserModel(userData);
        await newUser.save();

        // Create user profile
        const userProfile = new UserProfile({ user: newUser._id });
        await userProfile.save();

        // Generate JWT token
        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.jwtSecret);

        // Send success response with token
        res.json({ message: "User added successfully", success: true, token });
        // console.log("User added successfully", token);
       // console.log("user id", newUser._id);

    } catch (error) {
        console.error(`Error adding a new User: ${error.message}`);
        res.status(500).json({ message: "Server error", success: false });
    }
};


//api for User login


const user = (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {

            return res.status(400).json({ message: "All fields are required" });

        }
        //validate email
        if (!validator.isEmail(email)) {

            return res.json({ message: "Invalid email", success: false });
        }
        //find user by email
        UserModel.findOne({ email }).then((user) => {
            if (!user) {
                console.log("Invalid email or password");
                return res.json({ message: "Invalid email or password", success: false });
            }
            //compare password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch) {
                    console.log("Invalid email or password");
                    return res.json({ message: "Invalid email or password", success: false });
                }
                //create token
                // const token = jwt.sign({email: user.email, password: user.password}, process.env.jwtSecret);
                const token = jwt.sign({ _id: user._id, email: user.email }, process.env.jwtSecret);
                res.json({ message: "Login successful", success: true, token: token });
                
               // console.log("user id", user._id);

            })
        })
    }
    catch (error) {
        console.error(`Error logging in: ${error.message}`);
        res.status(500).json({ message: "Server error", success: false });
    }
}

const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.json({ success: true, user });
    
    } catch (error) {
        console.error(`Error fetching user data: ${error.message}`);
        res.status(500).json({ message: "Server error", success: false });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName, lastName, email, phone, gender, address, dob } = req.body;

        // Check for required fields
        if (!firstName || !lastName || !email || !phone || !gender || !address || !dob ) {
            return res.status(400).json({ message: "All fields are required for updating user" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }

        // Update user data
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, phone, gender, address, dob },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.json({ message: "User updated successfully", success: true, user: updatedUser });
      
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        res.status(500).json({ message: "Server error", success: false });
    }
};

const uploadImage = async (req, res) => {
    try {
        const userId = req.user._id;
        const { profileImage } = req.body;

        if (!profileImage) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        const updatedUserProfile = await UserProfile.findOneAndUpdate(
            { user: userId },
            { profileImage },
            { new: true, runValidators: true }
        );

        if (!updatedUserProfile) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.json({ message: "Profile image uploaded successfully", success: true, user: updatedUserProfile });
    } catch (error) {
        console.error(`Error uploading profile image: ${error.message}`);
        res.status(500).json({ message: "Server error", success: false });
    }
};

const getImage = async (req, res) => {
  //  console.log("succcess")
   
    const userId = req.user._id;
    const user = await UserProfile.findOne({ user: req.user._id }).select('profileImage');
  //  console.log(user)
    if (!user) {
       
        return res.status(404).json({ message: "User not found", success: false });
    }
    res.json({ success: true, profileImage: user.profileImage });
    try {
       
    } catch (error) {
        console.error(`Error:`, error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

module.exports = { addUser, user, getUserData, updateUser, uploadImage, getImage };