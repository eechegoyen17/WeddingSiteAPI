const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken')

const config = require('./app/config/db.config')
const tkey = require('./app/config/auth.config')

const register = require('./app/controllers/register')
const signin = require('./app/controllers/signin')

const db = knex({
  client: config.client,
  connection: config.connection
})
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "It Works!!!" });
});

app.get("/users", (req, res) => {
  const token = req.body.token
  jwt.verify(token, tkey.secret, (err, decodedToken) => {
    if(err){
      if (err.name === "TokenExpiredError"){
        res.status(401).json("Session Expired");
      }
      else{
        res.status(401).json("Unauthorized Access");
      }
    }
    else{
      return db.select('*').from('users')
      .then( user => res.json(user) )
    }
  })
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt, jwt, tkey)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
