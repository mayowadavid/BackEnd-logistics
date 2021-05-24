const Request = require('../models/request');
const Profile = require('../models/profile');

exports.getGallery = (req, res) => {
    Request.find({}, {requestImages: 1, _id: 0}).exec((error, gallery) => {
                if(error) return res.status(400).json({error});
                if(gallery){
                    Profile.find({}, {profileImage: 1,  _id: 1}).exec((error, profile) => {
                        if(error) return res.status(400).json({error});
                        if(profile) return res.status(201).json({profile, gallery})
                    })
                }    
            })
}