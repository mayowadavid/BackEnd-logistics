const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

exports.createProfile = (req, res) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(user){

                User.findOne({ _id: user._id})
                .exec((error, user) => {
                    if(error) return res.status(400).json({error});
                    if(user){
                        Profile.findOne({userId: user._id})
                        .exec((error, profile) => {
                            if(error) return res.status(400).json({error});
                            if(profile){ return res.status(200).json({profile})}else{
                                    const { 
                                            firstName,
                                            lastName,
                                            email,
                                            fullName,
                                            phoneNumber
                                        } = user;
                                       let userId = user._id;

                                        const _profile = new Profile({
                                            userId,
                                            firstName,
                                            lastName,
                                            email,
                                            phoneNumber,
                                            fullName
                                        })

                                        _profile.save((error, profile)=> {          
                                            if(error) return res.status(400).json({ error});
                                            if(profile){ res.status(201).json({profile, user});
                                        }
                                        }
                                        )
                            }
                        })
                       
                    }else{
                        return res.status(400).json({message: 'something went wrong'})
                    }
                })

        }
    }else{
        return res.status(400).json({message : 'Authorization required'})
    }
}

exports.getProfiles = (req, res) => {
   
    
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(user){
            Profile.findOne({userId: user._id})
            .exec((error, profile) => {
                if(error) return res.status(400).json({error});
                if(profile){ return res.status(201).json({profile, user})}
                else{
                    return res.status(400).json({message : 'user not found'})
                }
            })
        }
    }else{
        return res.status(400).json({message : 'Authorization required'})
    }
}


exports.updateProfile = (req, res) => {
   
    
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(user){
            Profile.findOne({userId: user._id})
            .exec((error, profile) => {
                if(error) return res.status(400).json({error});
                if(profile){ 

                    let {
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        address,
                        profileImage
                        } = req.body
                       
                        
                           profile.firstName = firstName !== null ? firstName: profile.firstName;
                           profile.lastName = lastName !== null ? lastName: profile.lastName;
                           profile.email = email !== null ? email: profile.email;
                           profile.phoneNumber = phoneNumber !== null ? phoneNumber: profile.phoneNumber;
                           profile.profileImage = profileImage !== null ? profileImage : profile.profileImage;
                           profile.address = address !== null ? address: profile.address;
            
                           profile.save((error, updatedProfile)=> {          
                               if(error) return res.status(400).json({error});
                               if(updatedProfile) return res.status(201).json({updatedProfile});
                           })

                }
                else{
                    return res.status(400).json({message : 'user not found'})
                }
            })
        }
    }else{
        return res.status(400).json({message : 'Authorization required'})
    }
}
