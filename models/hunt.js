var mongoose = require('mongoose');
var Task     = require('./task');
var User     = require('./user')

var HuntSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  description: String,
  start_time: Date,
  end_time: Date,
  password: String,
  location: String,
  price: Number,
  tasks: { type: mongoose.Schema.ObjectId, ref: 'Task'},
  participants: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

var Hunt = mongoose.model('Hunt', HuntSchema);
module.exports = Hunt;