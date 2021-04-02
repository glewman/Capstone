const { Router } = require("express");
const router = Router();

router
  // routes will be specified at the app-level
  .route("/") // equivalent to /users
  .get((request, response) => {
    response.json({ user: "Gary" });
  })
  .post((request, response) => {
    response.json(request.body);
  });
//Router Object
module.exports = router;

// route.route("/")...

router
  .route("/:id") // equivalent to /users/:id
  .get((request, response) => {
    // use params Object to get the ID
    const id = request.params.id;
    const user = db.get("users").getById(id).value();

    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ message: "Not Found" });
    }
  })
  .patch((request, response) => {
    const id = request.params.id;
    const user = db.get("users").updateById(id, request.body).write();

    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ message: "Not Found" });
    }
  })
  .delete((request, response) => {
    const id = request.params.id;
    const user = db.get("users").removeById(id).write();

    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ message: "Not Found" });
    }
  });

// router export statement
