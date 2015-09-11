var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var sassMiddleware = require('node-sass-middleware');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set("views", "./public");
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));

app.use(sassMiddleware({
  src: __dirname + '/scss', 
  dest: __dirname + '/public/css',
  debug: true,
  outputStyle: 'compressed',
  prefix: "/css"
  }),
  express.static(__dirname + '/public')
)

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000);