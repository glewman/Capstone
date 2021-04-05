const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fishSchema = new mongoose.Schema({
  date: String,
  type: String,
  diet: String,
  store: String,
  aggression: Boolean,
});

const fish = mongoose.model("fish", fishSchema);

module.exports = {
  model: fish,
  schema: fishSchema,
};
