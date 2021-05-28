const express = require('express');
const router = express.Router();
const { createProfile, getProfiles, updateProfile } = require('../controller/profile');



router.post('/profile/create', createProfile);

router.get('/profile/get', getProfiles);

router.post('/profile/update', updateProfile);

module.exports = router;