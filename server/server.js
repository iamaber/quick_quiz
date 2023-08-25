const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig"); 

const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");

app.use("/api/users", usersRoute); 
app.use("/api/exams", examsRoute); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});