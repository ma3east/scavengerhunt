var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var logger     = require("morgan");
var mongoose   = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/scavenger-hunt'
mongoose.connect(databaseURL);

app.set("views", "./public");
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000);

// ALEX'S playground
var server    = require('http').createServer(app);
var io        = require('socket.io')(server);
var Instagram = require('instagram-node-lib');

Instagram.set('client_id', process.env.SH_INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.SH_INSTAGRAM_CLIENT_SECRET);
Instagram.set('callback_url', process.env.SH_INSTAGRAM_CALLBACK);
Instagram.set('maxSockets', 50);

var tags = ['london'];

for (var i = 0; i < tags.length; i++) {
  Instagram.subscriptions.subscribe({ 
    object: 'tag', 
    object_id: tags[i]
  });
};

// app.get('/instagram/callback', function(req, res) {
//   instagram.subscriptions.handshake(req, res); 
// });

// app.post('/instagram/callback', function(req, res) {
//   console.log(req.body);

//   var notification = req.body;
//   io.sockets.emit('instagram', notification);
// });