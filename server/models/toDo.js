const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoSchema = new mongoose.Schema({
  date: String,
  task: String,
  priority: String,
  completed: Boolean,
});

const toDo = mongoose.model("toDo", toDoSchema);

module.exports = {
  model: toDo,
  schema: toDoSchema,
};
