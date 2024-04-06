"use strict";

var express = require('express');
var emailController = require('../controllers/email.controller');
var router = express.Router();
router.get('/users', emailController.sendOTP);
module.exports = router;