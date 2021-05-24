const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String
    },
   lastName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    address: {
       type: String 
    },
    profileImage: { 
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Profile', ProfileSchema);
