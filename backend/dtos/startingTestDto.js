module.exports = class StartingTestDto {
  constructor(model) {
    this.id = model._id;
    this.startTime = model.startTime;
  }
};
