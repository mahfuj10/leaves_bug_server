const express = require('express');
const projectController = require('../controllers/project.controller');


const router = express.Router();

router.post('/create', projectController.create);
router.get('/get', projectController.getById);
router.get('/my', projectController.getByCreator);
router.put('/update', projectController.update);
router.put('/update_sprint', projectController.update_sprint);
router.delete('/delete', projectController.delete_project);
router.post('/add-task', projectController.add_task_into_sprint);
router.post('/add-sprint', projectController.addSprint);
router.delete('/delete-sprint', projectController.deleteSprint);


module.exports = router;