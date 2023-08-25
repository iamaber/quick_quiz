const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig"); 

const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("../models/reportModel");

app.use("/api/users", usersRoute); 
app.use("/api/exams", examsRoute); 
app.use("/api/reports", reportsRoute); 

const port = process.env.PORT || 5000;

const path = require("path");




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});