const express = require("express");
const plants = require("../models/plants");
const router = express.Router();

//plant/coral\/\/\/

router.post("/", (request, response) => {
  const newPlants = new plants.model(request.body);
  newPlants.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

router.get("/", (request, response) => {
  plants.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  plants.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

router.get("/:id", (request, response) => {
  plants.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  plants.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        date: body.date,
        type: body.type,
        price: body.price,
        store: body.store,
        lighting: body.lighting,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

//plants/coral^^^^^
module.exports = router;
