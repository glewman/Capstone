const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fishSchema = new mongoose.Schema({
  type: String,
  date: String,
  diet: String,
  store: String,
  aggression: String,
});

const fish = mongoose.model("fish", fishSchema);

module.exports = {
  model: fish,
  schema: fishSchema,
};
