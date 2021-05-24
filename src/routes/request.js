const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createRequest, getRequests, getRequestByUserId, updateRequests} = require('../controller/request');
const router = express.Router();
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

router.post('/request/create', requireSignin, upload.array('requestImages'), createRequest);

router.get('/request/get', getRequests);

router.get('/request/userRequest', getRequestByUserId);

router.put('/request/:id', upload.array('requestImages'), adminMiddleware,  updateRequests);


module.exports = router;