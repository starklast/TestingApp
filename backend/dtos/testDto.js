module.exports = class TestDto {
  constructor(model) {
    this.id = model._id;
    this.description = model.description;
  }
};
