const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchasesSchema = new mongoose.Schema({
  date: String,
  item: String,
  price: String,
  store: String,
});

const purchases = mongoose.model("purchases", purchasesSchema);

module.exports = {
  model: purchases,
  schema: purchasesSchema,
};
