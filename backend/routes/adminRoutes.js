const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/questions/add', adminController.addQuestion);
router.post('/testStages/add', adminController.addTestStage);
router.post('/tests/add', adminController.addTest);
router.post('/tests/file', adminController.addTestFromFile);

module.exports = router;
