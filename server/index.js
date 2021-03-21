const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(bodyParser.json());
app.use(logging);

// Database stuff
mongoose.connect("mongodb://localhost/pizza");
const db = mongoose.connection;

let db_status = "MongoDB connection not successful.";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => (db_status = "Successfully opened connection to Mongo!"));

const toDoSchema = new mongoose.Schema({
  date: String,
  task: String,
  priority: String,
  completed: Boolean,
});

const toDo = mongoose.model("toDo", toDoSchema);

app.post("/toDos", (request, response) => {
  const newtoDo = new toDo(request.body);
  newtoDo.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

app.get("/toDos", (request, response) => {
  toDo.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.delete("/toDos/:id", (request, response) => {
  toDo.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

app.get("/toDos/:id", (request, response) => {
  toDo.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.put("/toDos/:id", (request, response) => {
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
//Shopping list -------
const shoppingListSchema = new mongoose.Schema({
  date: String,
  item: String,
  priority: String,
  store: String,
});

const shoppingList = mongoose.model("shoppingList", shoppingListSchema);

app.post("/shoppingLists", (request, response) => {
  const newshoppingList = new shoppingList(request.body);
  newshoppingList.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

app.get("/shoppingLists", (request, response) => {
  shoppingList.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.delete("/shoppingLists/:id", (request, response) => {
  toDo.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

app.get("/shoppingLists/:id", (request, response) => {
  toDo.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.put("/shoppingLists/:id", (request, response) => {
  const body = request.body;
  toDo.findByIdAndUpdate(
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
//Shopping list ^^^^^^

app.route("/").get((request, response) => {
  response.send("HELLO WORLD");
});

app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service running ok" }));
});

app
  .route("/posts")
  .get((request, response) => {
    // express adds a "params" Object to requests
    const id = request.params.id;
    let data = "The ID equals " + id;
    // handle GET request for post with an id of "id"
    if (request.query) {
      if (request.query.type) {
        if (request.query.type === "json") {
          data = { id: request.params.id, q: request.query };
        }
      }
    }
    response.status(418).json(data);
  })
  .post((request, response) => {
    response.json(request);
  });

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
