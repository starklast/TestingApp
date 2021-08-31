questionWhithAnswersDto = require('./questionWhithAnswersDto');
module.exports = class testStageWhithAnswersDto {
  constructor(model) {
    this.id = model._id;
    this.description = model.description;
    this.completed = true;

    this.questions = [];
    for (let index = 0; index < model.questions.length; index++) {
      let item = model.questions[index];
      this.questions.push(new questionWhithAnswersDto(item.question));
    }
  }
};
