"use strict";

var express = require('express');
var userController = require('../controllers/user.controller');
var router = express.Router();
router.post('/create', userController.create);
router.get('/check-user', userController.check_user);
router.get('/id', userController.getUserById);
router.post('/reset-password', userController.resetPassword);
router.get('/refresh-token', userController.refreshToken);
router.put('/update', userController.update);
module.exports = router;