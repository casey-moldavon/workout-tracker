const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const api = require("./routes/apiRoutes.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);

require("./routes/htmlRoutes")(app, path);

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
