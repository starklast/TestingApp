const { Schema, model } = require('mongoose');

const TestsSchema = new Schema({
  title: { type: String },
  description: { type: String },
  testStages: [
    {
      testStage: { type: Schema.Types.ObjectId, ref: 'TestStages' },
      weight: { type: Number },
    },
  ],
});

module.exports = model('Tests', TestsSchema);
