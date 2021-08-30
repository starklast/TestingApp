module.exports = class StartingTestDto {
  constructor(model) {
    this.id = model._id;
  }
};
