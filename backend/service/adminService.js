const mongoose = require('mongoose');
const questionModel = require('../models/questions');
const testStagesModel = require('../models/testStages');
const testsModel = require('../models/tests');
const uuid = require('uuid');
const asyncHandler = require('express-async-handler');

class AdminService {
  addQuestion = asyncHandler(async (data) => {
    data.answers.forEach((item) => {
      item._id = new mongoose.Types.ObjectId();
    });
    const question = await questionModel.create({ ...data });

    return question;
  });

  addTestStage = asyncHandler(async (data) => {
    for (let index = 0; index < data.questions.length; index++) {
      const item = data.questions[index];
      console.log(item);
      item.question = await this.addQuestion(item.question);
    }
    const testStage = await testStagesModel.create({
      ...data,
    });
    return testStage;
  });

  addTest = asyncHandler(async (data) => {
    for (let index = 0; index < data.testStages.length; index++) {
      const item = data.testStages[index];
      console.log(item);
      item.testStage = await this.addTestStage(item);
    }
    const testStage = await testsModel.create({
      ...data,
    });
    return testStage;
  });
}
module.exports = new AdminService();
