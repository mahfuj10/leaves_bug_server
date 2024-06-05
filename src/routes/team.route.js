const express = require('express');
const teamController = require('../controllers/team.controller');


const router = express.Router();

router.post('/create', teamController.create);
router.get('/id', teamController.getById);
router.put('/update', teamController.update);
router.delete('/delete/:teamId/with-references', teamController.deleteTeamAndReferences);


module.exports = router;