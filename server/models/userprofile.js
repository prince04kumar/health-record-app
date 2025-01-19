const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
   
    profileImage: {
        type: String,
        default:"uploadimage",
    },
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user',
       required: true
     }
   
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
