const express = require('express');
const { requireSignin } = require('../common-middleware');
const { signup, signin, signout} = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();


router.post('/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/signup',validateSignupRequest, isRequestValidated, signup);

router.post('/signout', signout);



module.exports = router;