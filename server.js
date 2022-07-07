const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const config = require("./app/config/db.config")

const db = knex({
  client: config.client,
  connection: config.connection
})
const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
