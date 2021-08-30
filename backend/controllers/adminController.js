const asyncHandler = require('express-async-handler');

const adminService = require('../service/adminService');

class AdminController {
  // @desc
  // @route   POST /api/
  // @access  Public

  addQuestion = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    if (!data.description || !data.answers) {
      throw new Error('no data');
    }
    await adminService.addQuestion(data);
    res.send('ok');
  });
  // @desc
  // @route   POST /api/
  // @access  Public

  addTestStage = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    if (!data.description || !data.questions) {
      throw new Error('no data');
    }
    await adminService.addTestStage(data);
    res.send('ok');
  });

  // @desc
  // @route   POST /api/
  // @access  Public

  addTest = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };
    if (!data.description || !data.testStages) {
      throw new Error('no data');
    }

    await adminService.addTest(data);
    res.send('ok');
  });
}
module.exports = new AdminController();
