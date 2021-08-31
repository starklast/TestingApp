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

  getTestResult = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const sTest = await teskService.getStartingTestByID(id);
    const testData = await teskService.getTestByIDWhithAnswers(sTest.test);
    //res.send(testData);
    const testLog = await teskService.getAnswers(id);
    const countCorrrectAnswers = testData.testStages.reduce(
      (tsSum, { testStage }) =>
        (tsSum += testStage.questions.reduce(
          (sum, { question }) =>
            (sum += question.answers.every((answer) => {
              if (answer.correct) {
                /* console.log(testLog);
                console.log(question.id); */

                /*  console.log(
                  testLog.find(
                    (testLogItem) => testLogItem.question == question.id
                  )
                ); */
                //return true;
                const logAnswers = testLog.find(
                  (testLogItem) => testLogItem.question == question.id
                );
                if (
                  logAnswers &&
                  logAnswers.answers.find((logAnswer) => logAnswer == answer.id)
                ) {
                  return true;
                }
                return false;
              } else {
                const logAnswers = testLog.find(
                  (testLogItem) => testLogItem.question == question.id
                );
                if (logAnswers) {
                  if (
                    logAnswers.answers.find(
                      (logAnswer) => logAnswer == answer.id
                    )
                  ) {
                    return false;
                  } else return true;
                }

                return false;
              }
            })
              ? 1
              : 0),
          0
        )),
      0
    );
    console.log(countCorrrectAnswers);
    const countQuestions = testData.testStages.reduce(
      (sum, { testStage }) => (sum += testStage.questions.length),
      0
    );
    res.send({
      correctPercent: Math.floor((countCorrrectAnswers / countQuestions) * 100),
      countCorrrectAnswers,
      countQuestions,
      startTime: sTest.startTime,
      endTime: sTest.endTime,
    });
    //res.send(testData);
  });

  getQuestionsNextStage = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      throw new Error(`Bad data ${id}`);
    }
    const sTest = await teskService.getStartingTestByID(id);
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
        await teskService.stopTest(id);

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
    const id = req.params.id;
    if (!id) {
      throw new Error('Bad data');
    }
    const sTest = await teskService.getStartingTestByID(id);
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
