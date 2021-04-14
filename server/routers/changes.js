const express = require("express");
const changes = require("../models/changes");
const router = express.Router();

//changes\/\/\/\/

router.post("/", (request, response) => {
  const newChanges = new changes.model(request.body);
  newChanges.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

router.get("/", (request, response) => {
  changes.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  changes.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

router.get("/:id", (request, response) => {
  changes.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  changes.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        date: body.date,
        task: body.task,
        effect: body.effect,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

//changes^^^
module.exports = router;
