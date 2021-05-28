const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createRequest, getRequests, getRequestByUserId, updateRequests} = require('../controller/request');
const router = express.Router();



router.post('/request/create', requireSignin, createRequest);

router.get('/request/get', getRequests);

router.get('/request/userRequest', getRequestByUserId);

router.put('/request/:id', adminMiddleware,  updateRequests);


module.exports = router;