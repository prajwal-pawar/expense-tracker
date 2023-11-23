const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// mongo database url
const mongoUrl = "mongodb://localhost/ExpenseTracker";

mongoose.connect(mongoUrl);

// establish mongodb connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongodb connection error"));

db.once("open", () => {
  console.log("connected to mongodb");
});

module.exports = db;
