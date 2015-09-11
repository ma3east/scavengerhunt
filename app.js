var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set("views", "./views");
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));


app.use(require('./controllers'));

app.listen(process.env.PORT || 5000);