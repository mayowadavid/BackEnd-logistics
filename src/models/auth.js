const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3, 
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3, 
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowerCase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowerCase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'dev'],
        default: 'user'
    },
    phoneNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true})

// UserSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

UserSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}
UserSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`; 
});

module.exports = mongoose.model('User', UserSchema);