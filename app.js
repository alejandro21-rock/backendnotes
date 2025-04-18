const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const loginRouter = require("./controllers/login");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const process = require("node:process");
/* mongoose.set("strictQuery", false);


mongoose
.connect(config.MONGODB_URI)
.then(() => {
  logger.info("connected to MongoDB");
})
.catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
}); */

logger.info("connecting to", config.MONGODB_URI);
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

/* console.log("connecting to", url); */
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
