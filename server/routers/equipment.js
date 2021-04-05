const express = require("express");
const equipment = require("../models/equipment");
const router = express.Router();

//Equipment----

router.post("/", (request, response) => {
  const newEquipment = new equipment(request.body);
  newEquipment.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

router.get("/", (request, response) => {
  equipment.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  equipment.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

router.get("/:id", (request, response) => {
  equipment.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  equipment.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        date: body.date,
        type: body.type,
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
//Equipment^^^^^^
module.exports = router;
