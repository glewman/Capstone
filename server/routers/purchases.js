const express = require("express");
const purchases = require("../models/purchases");
const router = express.Router();

//purchases\/\/\/\/\/

router.post("/", (request, response) => {
  const newPurchases = new purchases.model(request.body);
  newPurchases.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

router.get("/", (request, response) => {
  purchases.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  purchases.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

router.get("/:id", (request, response) => {
  purchases.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  purchases.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        date: body.date,
        item: body.item,
        price: body.price,
        store: body.store,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

//purchases^^^^^^
module.exports = router;
