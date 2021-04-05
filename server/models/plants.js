const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantsSchema = new mongoose.Schema({
  date: String,
  type: String,
  price: String,
  store: String,
  lighting: String,
});
const plants = mongoose.model("plants", plantsSchema);

module.exports = {
  model: plants,
  schema: plantsSchema,
};
