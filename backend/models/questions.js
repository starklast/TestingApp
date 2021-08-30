const { Schema, model } = require('mongoose');

const QuestionsSchema = new Schema({
  title: { type: String },
  description: { type: String },
  answers: [
    {
      _id: { type: Schema.Types.ObjectId },
      answer: { type: String },
      correct: { type: Boolean },
    },
  ],
});

module.exports = model('Questions', QuestionsSchema);
