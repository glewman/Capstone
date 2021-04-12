const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoSchema = new mongoose.Schema({
  date: String,
  item: String,
  priority: String,
  completed: String,
});

const toDo = mongoose.model("toDo", toDoSchema);

module.exports = {
  model: toDo,
  schema: toDoSchema,
};
