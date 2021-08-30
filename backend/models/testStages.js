const { Schema, model } = require('mongoose');

const TestStagesSchema = new Schema({
  title: { type: String },
  description: { type: String },
  questions: [
    {
      question: { type: Schema.Types.ObjectId, ref: 'Questions' },
      weight: { type: Number },
    },
  ],
});

module.exports = model('TestStages', TestStagesSchema);
