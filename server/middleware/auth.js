const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Adjust the path to your User model

const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        // console.log("authorizationHeader");
        if (!authorizationHeader) {
            return res.status(401).send({ error: 'Authorization header missing.' });
        }

        const token = authorizationHeader.replace('Bearer ', '');
        
        const decoded = jwt.verify(token, process.env.jwtSecret);
        
        const user = await User.findOne({ _id: decoded._id});
        console.log(user);
        
        if (!user) {
            throw new Error('User not found.');
        }
        
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
