var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var logger     = require("morgan");
var mongoose   = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/scavenger-hunt'
mongoose.connect(databaseURL);


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

// REALTIME Instagram setup
// Hunt-tag -> hunt + task + user
var server    = require('http').createServer(app);
var io        = require('socket.io')(server);
var Instagram = require('instagram-node-lib');
var request   = require('request');

Instagram.set('client_id', process.env.SH_INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.SH_INSTAGRAM_CLIENT_SECRET);
Instagram.set('callback_url', process.env.SH_INSTAGRAM_CALLBACK);
Instagram.set('maxSockets', 50);

var tags = ['london'];

for (var i = 0; i < tags.length; i++) {
  Instagram.subscriptions.subscribe({ 
    object: 'tag', 
    object_id: tags[i],
    aspect: 'media',
    type: 'subscription',
    complete: function(data){
      console.log('Begin fetching #', data.object_id);
    }
  });
};

app.post("/instagram/callback", function(req,res){
  console.log("POST received");

  var taggedPost = req.body;
  var url = 'https://api.instagram.com/v1/tags/' +  req.body.object_id + '/media/recent?client_id=' + process.env.SH_INSTAGRAM_CLIENT_ID;

  console.log(url);
  request(url, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      console.log(body.data);

      // Inside this, we should find the id of the task
      // Decode the tag
      // And find in our DB and update hunt
    }
  })
})

app.get("/instagram/callback", function(req,res){
  Instagram.subscriptions.handshake(req, res); 
})