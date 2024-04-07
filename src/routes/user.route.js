const express = require('express');
const userController = require('../controllers/user.controller');


const router = express.Router();

router.post('/create', userController.create);
router.get('/check-user', userController.check_user);
router.get('/id', userController.getUserById);
router.post('/reset-password', userController.resetPassword);


module.exports = router;