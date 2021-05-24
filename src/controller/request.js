const Request = require('../models/request');
const slugify = require('slugify');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

exports.createRequest = (req, res) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(user){

                User.findOne({ _id: user._id})
                .exec((error, user) => {
                    if(error) return res.status(400).json({error});
                    if(user){
                                let {
                                    cartons,
                                    deliveryLocations,
                                    descriptions,
                                    itemsWorth,
                                    tagName,
                                    otherItems,
                                    sender,
                                    receiver
                                    } = req.body;
                                   
                            
                                    let requestImages = [];
                            
                                    if(req.files.length > 0){
                                       requestImages = req.files.map(file => {
                                            return {img: file.filename}
                                        })
                                    }
                                    
                            
                                    let slug = slugify(tagName)
                                    let userId = user._id;
                                    const request = new Request ({
                                        userId,
                                        cartons,
                                        deliveryLocations,
                                        descriptions,
                                        itemsWorth,
                                        tagName,
                                        otherItems,
                                        sender,
                                        receiver,
                                        requestImages,
                                        slug 
                                    });
                            
                                    request.save((error, request)=> {          
                                        if(error) return res.status(400).json(console.log(error.response));
                                        if(request) return res.status(201).json({request, files: req.files});
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

exports.getRequests = (req, res) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(user){
            Request.find({})
                .exec((error, request) => {
                    if(error) return res.status(400).json({error});
                    if(request) return res.status(201).json({request, user})
                })
        }
    }else{
        return res.status(400).json({message : 'Authorization required'})
    }
}

exports.updateRequests = (req, res) => {
     conditions = {_id: req.params.id};
     Request.findById(conditions, function(error, request) {
        // if(error) return res.status(400).json({error});
        if(error) return res.status(400).json({error})
        if(request){
        
            let {
                cartons,
                deliveryLocations,
                descriptions,
                itemsWorth,
                tagName,
                otherItems,
                sender,
                receiver,
                amount,
                status
                } = req.body;
            
            let requestImages = [];

            if(req.files.length > 0){
            requestImages = req.files.map(file => {
                    return {img: file.filename}
                })
            }
                let slug = slugify(tagName)

                request.cartons = cartons;
                request.deliveryLocations = deliveryLocations;
                request.descriptions = descriptions;
                request.itemsWorth = itemsWorth;
                request.tagName = tagName;
                request.otherItems = otherItems;
                request.sender = sender;
                request.receiver = receiver;
                request.amount = amount;
                request.status = status;
                request.requestImages =[...request.requestImages, ...requestImages];
                request.slug = slug;

                request.save((error, updatedRequest)=> {          
                    if(error) return res.status(400).json({error});
                    if(updatedRequest) return res.status(201).json({updatedRequest, files: req.files});
                })
    }})}


exports.getRequestById = (req, res) => {
    const id = {_id: req.params.id};
    Request.findOne(id)
    .exec((error, singleRequest) =>{
        if(error) return res.status(400).json({error});
        if(singleRequest) return res.status(201).json({singleRequest})
    })
}

exports.getRequestByUserId = (req, res) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(user){
            Request.find({userId: user._id}, { _id: 1, tagName: 1, createdAt: 1, status: 1, _id: 1, amount: 1})
                .exec((error, userRequest) => {
                    if(error) return res.status(400).json({error});
                    if(userRequest) return res.status(201).json({userRequest})
                })
        }
    }else{
        return res.status(400).json({message : 'Authorization required'})
    }
}