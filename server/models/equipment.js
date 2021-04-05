const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equipmentSchema = new mongoose.Schema({
  date: String,
  type: String,
  price: String,
  store: String,
});

const equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = {
  model: equipment,
  schema: equipmentSchema,
};
