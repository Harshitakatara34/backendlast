require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URL = process.env.mongoUrl;

const connection = mongoose.connect(MONGODB_URL);

module.exports = {
  connection,
};
