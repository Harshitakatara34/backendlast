const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { connection } = require("./Controllers/connection");
const { route } = require("./Routes/user.route"); 
const {blog}=require("./Routes/blog.route")

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", route);
app.use("/",blog)

app.use("/", (req, res) => {
  res.status(404).json({ msg:"Home Page" });
})

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
  console.log(`Server is running on port ${PORT}`);
});
