const asyncHandler = require('express-async-handler');

const teskService = require('../service/testService');
const startingTestDto = require('../dtos/startingTestDto');
const testDto = require('../dtos/testDto');
const testStageDto = require('../dtos/testStageDto');
const testStageWhithAnswersDto = require('../dtos/testStageWhithAnswersDto');

class TestController {
  // @desc
  // @route   POST /api/
  // @access  Public

  getRandomTest = asyncHandler(async (req, res, next) => {
    const testData = await teskService.getRandomTest();
    res.send(new testDto(testData));
  });

  startTest = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    const sTest = await teskService.starTest(data);
    res.send(new startingTestDto(sTest));
  });

  getQuestionsNextStage = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    if (!data || !data.id) {
      throw new Error('Bad data');
    }
    const sTest = await teskService.getStartingTestByID(data.id);
    if (!sTest) {
      throw new Error('Bad data');
    }
    const Test = await teskService.getTestByID(sTest.test);
    const completedStages = sTest.completedStages;
    let nextStage = null;
    //let lastStage = false;

    let countStages = Test.testStages.length;
    if (countStages === 0) {
      throw new Error('Test is empty');
    }
    const currentStage = sTest.currentStage;
    if (!currentStage || completedStages.length === 0) {
      nextStage = await teskService.getTestStageByID(
        Test.testStages[0].testStage
      );
    } else {
      const nextStages = Test.testStages.filter(
        (item) => !completedStages.includes(item.testStage)
      );
      if (nextStages.length === 0) {
        res.send({ testCompleted: true });
      } else {
        nextStage = await teskService.getTestStageByID(nextStages[0].testStage);
      }
    }
    await teskService.updateStartingTest({
      _id: sTest._id,
      currentStage: nextStage,
    });
    res.send(new testStageDto(nextStage));
  });

  completCurrentStage = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    if (!data || !data.id || !data.questions) {
      throw new Error('Bad data');
    }
    const sTest = await teskService.getStartingTestByID(data.id);
    if (!sTest) {
      throw new Error('Bad data');
    }
    for (let index = 0; index < data.questions.length; index++) {
      const item = data.questions[index];
      await teskService.writeTestLog({
        startingTest: sTest._id,
        testStage: sTest.currentStage,
        question: item.id,
        answers: item.answers,
      });
    }
    await teskService.completCurrentStage(data.id);
    res.send(true);
  });
  getStageQuestionsWhithAnswers = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    if (!data || !data.id) {
      throw new Error('Bad data');
    }
    const sTest = await teskService.getStartingTestByID(data.id);
    if (!sTest) {
      throw new Error('Bad data');
    }
    const currentStage = sTest.currentStage;
    const completedStages = sTest.completedStages;
    if (
      !currentStage ||
      completedStages.length === 0 ||
      !completedStages.includes(currentStage)
    ) {
      res.send('Bad data');
    }
    const dataStage = await teskService.getTestStageByID(currentStage);
    res.send(new testStageWhithAnswersDto(dataStage));
  });
}

module.exports = new TestController();
