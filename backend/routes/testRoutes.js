const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/getRandomTest', testController.getRandomTest);
router.post('/startTest', testController.startTest);
router.get('/getNextTestStage', testController.getQuestionsNextStage);
router.post('/completCurrentStage', testController.completCurrentStage);
router.get(
  '/getStageWhithAnswers',
  testController.getStageQuestionsWhithAnswers
);

module.exports = router;
