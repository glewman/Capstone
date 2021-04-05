const express = require("express");
const toDo = require("../models/toDo");
const router = express.Router();

router.post("/", (request, response) => {
  const newtoDo = new toDo(request.body);
  newtoDo.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

router.get("/", (request, response) => {
  toDo.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  toDo.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

router.get("/:id", (request, response) => {
  toDo.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  toDo.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        date: body.date,
        task: body.task,
        priority: body.priority,
        completed: body.completed,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});
module.exports = router;
