const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cartons: {
        type: Number
    },
    deliveryLocations: {
        type: String,
        required: true 
    },
    descriptions: {
        type: String,
        required: true
    },
    itemsWorth: {
        type: Number,
        required: true
    },
    requestImages: [
        {cloudUrl: {type: String } }
    ],
    otherItems: {
        type: Boolean
    },
    
    tagName: {
        type: String,
        required: true
    },
    receiver: {firstName: {
        type: String,
        required: true
    }, 
    phoneNumber1: {
        type: Number,
        required: true
    } , 
    phoneNumber2: {
        type: Number,
        required: true
    }},
    sender: {firstName: {
        type: String,
        required: true
    }, 
    phoneNumber1: {
        type: Number,
        required: true
    } , 
    phoneNumber2: {
        type: Number,
        required: true
    }},
    slug: {
        type: String,
        required: true
    },
    amount: {
        type: String
    },
    status: {
        type: String,
        enum: ['processing', 'pending', 'onHold', 'canceled', 'completed'],
        default: 'pending'
    },
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updatedAt: Date,
} , {timestamps: true});



module.exports = mongoose.model('Request', requestSchema);