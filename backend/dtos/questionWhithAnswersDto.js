module.exports = class questionWhithAnswersDto {
  constructor(model) {
    this.id = model._id;
    this.description = model.description;

    this.answers = [];
    for (let index = 0; index < model.answers.length; index++) {
      let item = model.answers[index];

      this.answers.push({
        answer: item.answer,
        id: item._id,
        correct: item.correct,
      });
    }
  }
};
