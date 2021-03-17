const express = require("express");
const app = express();

app.route("/").get((request, response) => {
  response.send("HELLO WORLD");
});

app.listen(4040, () => console.log("Listening on port 4040"));
