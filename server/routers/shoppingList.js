const express = require("express");
const shoppingList = require("../models/shoppingList");
const router = express.Router();

//Shopping list -------

router.post("/", (request, response) => {
  const newshoppingList = new shoppingList.model(request.body);
  console.log(newshoppingList);
  newshoppingList.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

router.get("/", (request, response) => {
  shoppingList.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  shoppingList.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

router.get("/:id", (request, response) => {
  shoppingList.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  shoppingList.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        date: body.date,
        item: body.item,
        priority: body.priority,
        store: body.store,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

module.exports = router;
