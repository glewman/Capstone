const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routers/users");
const shoppingList = require("./routers/shoppingList");
const app = express();

// Middleware
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(bodyParser.json());
app.use(logging);
app.use(cors);
app.use("/users", users);
app.use("/shoppingList", shoppingList);

// Database stuff
mongoose.connect("mongodb://localhost/Tankmate");
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

//Fish Log-------
const fishSchema = new mongoose.Schema({
  date: String,
  type: String,
  diet: String,
  store: String,
  aggression: Boolean,
});

const fish = mongoose.model("fish", fishSchema);

app.post("/fishs", (request, response) => {
  const newFish = new fish(request.body);
  newFish.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

app.get("/fishs", (request, response) => {
  fish.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.delete("/fishs/:id", (request, response) => {
  fish.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

app.get("/fishs/:id", (request, response) => {
  fish.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.put("/fishs/:id", (request, response) => {
  const body = request.body;
  fish.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        date: body.date,
        type: body.type,
        diet: body.diet,
        store: body.store,
        aggression: body.aggression,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});
//Fish Log^^^^^^^

//Equipment----
const equipmentSchema = new mongoose.Schema({
  date: String,
  type: String,
  price: String,
  store: String,
});

const equipment = mongoose.model("Equipment", equipmentSchema);

app.post("/equipments", (request, response) => {
  const newEquipment = new equipment(request.body);
  newEquipment.save((err, data) => {
    return err ? response.sendStatus(500).json(err) : response.json(data);
  });
});

app.get("/equipments", (request, response) => {
  equipment.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.delete("/equipments/:id", (request, response) => {
  equipment.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(null);
  });
});

app.get("/equipments/:id", (request, response) => {
  equipment.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.put("/equipments/:id", (request, response) => {
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
