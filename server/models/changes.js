const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const changesSchema = new mongoose.Schema({
  date: String,
  task: String,
  effect: String,
});

const changes = mongoose.model("changes", changesSchema);

module.exports = {
  model: changes,
  schema: changesSchema,
};
