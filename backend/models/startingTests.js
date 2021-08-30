const { Schema, model } = require('mongoose');

const StartingTestsSchema = new Schema({
  test: { type: Schema.Types.ObjectId, ref: 'Tests' },
  currentStage: { type: Schema.Types.ObjectId, ref: 'TestStages' },
  currentQuestion: { type: Schema.Types.ObjectId, ref: 'Questions' },
  //testResult: { type: Schema.Types.ObjectId, ref: 'TestResults' },
  completed: { type: Boolean },
  completedStages: [{ type: Schema.Types.ObjectId, ref: 'TestStages' }],
  startTime: { type: Date },
  endTime: { type: Date },
  persentCorrectAnswers: { type: Number },
});

module.exports = model('StartingTests', StartingTestsSchema);
