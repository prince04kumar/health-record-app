const jwt = require('jsonwebtoken');


const authAdmin = async (req, res, next) => {
    try{
        const {atoken} = req.headers
        if(!atoken) res.status(401).json({message: "not authorized login agent", success: false});
        
        const token_decoded = jwt.verify(atoken , process.env.jwtSecret);
        if(token_decoded.email !== process.env.ADMIN_EMAIL || token_decoded.password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({message: "not authorized login agent", success: false});
        }
        next();
    }
    catch(error){
        console.error(`Error authenticating admin: ${error.message}`);
        res.status(500).json({message: "Server error", success: false});
    }
}

module.exports = authAdmin;