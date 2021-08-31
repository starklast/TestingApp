QuestionDto = require('./questionDto');
module.exports = class TestStageDto {
  constructor(model) {
    this.id = model._id;
    this.description = model.description;
    this.completed = false;
    this.questions = [];
    for (let index = 0; index < model.questions.length; index++) {
      let item = model.questions[index];
      this.questions.push(new QuestionDto(item.question));
    }
  }
};
