"use strict";

var express = require('express');
var emailController = require('../controllers/email.controller');
var router = express.Router();
router.post('/send', emailController.sendEmail);
module.exports = router;