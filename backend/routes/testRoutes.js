const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/getRandomTest', testController.getRandomTest);
router.post('/startTest', testController.startTest);
router.get('/getNextTestStage/:id', testController.getQuestionsNextStage);
router.post('/completCurrentStage', testController.completCurrentStage);
router.get(
  '/getStageWhithAnswers/:id',
  testController.getStageQuestionsWhithAnswers
);
router.get('/getTestResult/:id', testController.getTestResult);

module.exports = router;
