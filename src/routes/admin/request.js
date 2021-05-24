const express = require('express');
const router = express.Router();
const {  getRequestById} = require('../../controller/request');

router.get('/admin/:id', getRequestById);

module.exports = router;