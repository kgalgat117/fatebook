var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var path = require('path');
var connectionString = 'mongodb+srv://social:social@cluster0-iw2rv.mongodb.net/fatebook?retryWrites=true&w=majority'
var DB = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

var schema = mongoose.Schema({
  email: String,
  password: String
})

var model = DB.model('users', schema)

DB.once("open", async () => {
  console.log(`Connected to database `);
});

DB.on("error", () => {
  console.log("Error connecting to database");
});

router.get('/', function (req, res) {
  if (req.useragent.isMobile) {
    res.render('index_m');
  } else {
    res.render('index_d');
  }
})

/* GET home page. */
router.post('/fatebook', function (req, res, next) {
  console.log(req.useragent)
  model.create(req.body).then(user => {
    res.status(200).json(user)
  }, err => {
    res.status(400).json({ error: 'something went wrong' })
  })
})

module.exports = router;
