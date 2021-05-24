const express = require('express');
const router = express.Router();
const { createProfile, getProfiles, updateProfile } = require('../controller/profile');
const multer = require('multer');
const {nanoid} = require('nanoid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/' )
    },
    filename: function (req, file, cb) {
      cb(null, nanoid() + '-' + file.originalname)
    }
  })

  const upload = multer({ storage });

router.post('/profile/create', upload.single('profileImage'), createProfile);

router.get('/profile/get', getProfiles);

router.post('/profile/:id', upload.single('profileImage'), updateProfile);

module.exports = router;