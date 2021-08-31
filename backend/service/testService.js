const mongoose = require('mongoose');
const questionModel = require('../models/questions');
const testStagesModel = require('../models/testStages');
const testsModel = require('../models/tests');
const testLog = require('../models/testLog');
const startingTestsModel = require('../models/startingTests');
const uuid = require('uuid');
const asyncHandler = require('express-async-handler');

class TaskService {
  getRandomTest = asyncHandler(async () => {
    const tests = await testsModel.find({}, '_id, description');
    const test = tests[Math.floor(Math.random() * tests.length)];

    return test;
  });

  getTestByID = asyncHandler(async (id) => {
    const Test = await testsModel.findById(id);
    if (!Test) {
      throw new Error("Can't finde test");
    }

    return Test;
  });
  getTestByIDWhithAnswers = asyncHandler(async (id) => {
    const Test = await testsModel
      .findById(id)
      /*       .populate({
        path: 'testStages',
        populate: { path: 'testStage' },
      }) */
      .populate({
        path: 'testStages',
        populate: {
          path: 'testStage',
          populate: { path: 'questions', populate: { path: 'question' } },
        },
      });
    if (!Test) {
      throw new Error("Can't finde test");
    }

    return Test;
  });

  getTestStageByID = asyncHandler(async (id) => {
    const testStage = await testStagesModel.findById(id).populate({
      path: 'questions',
      populate: { path: 'question' },
    });
    /* .populate('question')
      .exec(); */
    console.log('testStage');
    console.log(testStage);
    if (!testStage) {
      throw new Error(`Can't finde test stage ${id}`);
    }

    return testStage;
  });

  writeTestLog = asyncHandler(async (data) => {
    const { startingTest, testStage, question, answers } = data;
    const res = await testLog.findOneAndUpdate(
      { startingTest, testStage, question },
      data,
      { upsert: true, overwrite: false, useFindAndModify: false }
    );

    return res;
  });

  getAnswers = asyncHandler(async (id) => {
    const answers = await testLog.find({ startingTest: id });
    return answers;
  });

  getQuestionByID = asyncHandler(async (id) => {
    const question = await questionModel.findById(id);
    if (!question) {
      throw new Error("Can't finde question");
    }

    return question;
  });

  getStartingTestByID = asyncHandler(async (id) => {
    const sTest = await startingTestsModel.findById(id);
    if (!sTest) {
      throw new Error("Can't finde starting test");
    }

    return sTest;
  });

  starTest = asyncHandler(async (data) => {
    if (!data || !data.id) {
      throw new Error('bad data');
    }

    const test = await testsModel.findById(data.id);
    if (!test) {
      throw new Error("Can't find test by ID");
    }

    const sTest = await startingTestsModel.create({
      test: test,
      startTime: new Date(),
    });
    return sTest;
  });

  stopTest = asyncHandler(async (id) => {
    const query = { _id: id };
    await startingTestsModel.findOneAndUpdate(
      query,
      {
        endTime: new Date(),
        completed: true,
      },
      { useFindAndModify: false }
    );
    return true;
  });

  completCurrentStage = asyncHandler(async (id) => {
    const query = { _id: id };
    const StartingTest = await this.getStartingTestByID(id);
    const completedStages = StartingTest.completedStages;
    console.log(StartingTest);
    if (!completedStages.includes(StartingTest.currentStage)) {
      completedStages.push(StartingTest.currentStage);
      await startingTestsModel.findOneAndUpdate(
        query,
        {
          completedStages: completedStages,
        },
        { useFindAndModify: false }
      );
    }

    return true;
  });

  updateStartingTest = asyncHandler(async (data) => {
    const query = { _id: data._id };
    console.log(data);
    await startingTestsModel.findOneAndUpdate(
      query,
      {
        currentStage: data.currentStage,
        currentQuestion: data.currentQuestion,
      },
      { useFindAndModify: false }
    );
    return true;
  });
}

module.exports = new TaskService();
