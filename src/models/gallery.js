const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    galleryImages: [
        {img: {type: String } }
    ],
}, {timestamps: true})

module.exports = mongoose.model('Gallery', GallerySchema);
