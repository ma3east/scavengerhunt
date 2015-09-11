var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require('mongoose');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/scavenger-hunt'
mongoose.connect(databaseURL);

// Setup Passport
require('./config/passport')(passport);


// Setting view folder for single index.html file
app.set("views", "./public");
app.engine('html', require('ejs').renderFile);

// Serve all js, css, html from the public folder
app.use(express.static(__dirname + '/public'));

// Serving bower_components from root. Might change to public later
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(logger('dev'));

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000);