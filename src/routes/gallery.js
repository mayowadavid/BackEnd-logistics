const express = require('express');
const { getGallery } = require('../controller/gallery');
const router = express.Router();



router.get('/gallery/get', getGallery);


module.exports = router;