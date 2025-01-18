const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    // ...existing code...
    profileImage: {
        type: String,
        default:"Upload Image",
    }
    // ...existing code...
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
