const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email})
    .exec(async(error, user) => {
        if(user){
            return res.status(400).json({
                message: 'User already exist'
            })
        }
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({ 
             firstName,
             lastName,
             email,
             hash_password,
             phoneNumber,
            userName: `${firstName} ${lastName}`
        });
        const token = jwt.sign({_id: _user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'something went wrong'
                });
            }if (data){
                return res.status(201).json({
                    token,
                    data
                })
            }
        })
    })
}

exports.signin =(req, res) => {
    User.findOne({ email: req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
                const { 
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                        phoneNumber
                    } = user;
                    res.cookie('token', token, {expiresIn: '1h'});
                        res.status(200).json({
                            token,
                            user: {
                                _id, firstName, lastName, email, role, fullName, phoneNumber
                            }
                        })
            }else {
                 return res.status(400).json({
                    message: 'invalid password'
                })
            }
        }else{
            return res.status(400).json({message: 'something went wrong'})
        }
    })
}

exports.signout = (req, res) => {
    
    res.clearCookie('token');
    res.status(200).json({
        message: "Sign out successfully..."
    })

}