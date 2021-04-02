const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingListSchema = new mongoose.Schema({
  date: String,
  item: String,
  priority: String,
  store: String,
});

const shoppingList = mongoose.model("shoppingList", shoppingListSchema);

module.exports = {
  model: shoppingList,
  schema: shoppingListSchema,
};
