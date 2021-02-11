var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
var Users = require('./Models/user')

require('dotenv/config')
var app = express()
app.use(cookieParser());
app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



app.listen(process.env.PORT||4000, () => {
});

require('dotenv/config')

const mongoose = require('mongoose')

const url = process.env.URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
})

const path = require('path')
const { ObjectId } = require('mongodb')
const UserFuntion = require('./userfunction/userfunction')

app.get('/', function (req, res) {

})

app.post('/login', async (req, res) => {
  const email = req.body.Login.email
  const pass = req.body.Login.pass
  res.cookie("token", "risak")
  if (email === "admin@namasys.co" && pass === "admin") {
    const token = jwt.sign({ email: email }, process.env.SECRET, {
      expiresIn: '600s'
    })

    res.json({ 'mes': token })
  } else {
    res.json({ "mes": "error" })
  }
})

var authenticate = function (req, res, next) {
  try {
    const verified = jwt.verify(req.body.token, process.env.SECRET)
    next()
  } catch (e) {
    res.json({ "mes": "expired" })
  }
}

app.use(authenticate, UserFuntion)
