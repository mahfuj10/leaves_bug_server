const express = require('express');
const emailController = require('../controllers/email.controller');


const router = express.Router();


router.get('/users', emailController.sendOTP);


module.exports = router;