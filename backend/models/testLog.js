const { Schema, model } = require('mongoose');

const TestLogSchema = new Schema({
  startingTest: { type: Schema.Types.ObjectId, ref: 'StartingTests' },
  testStage: { type: Schema.Types.ObjectId, ref: 'TestStages' },
  question: { type: Schema.Types.ObjectId, ref: 'Questions' },
  answers: [{ type: Schema.Types.ObjectId }],
});

module.exports = model('TestLog', TestLogSchema);
