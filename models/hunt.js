var mongoose = require('mongoose');
var Task     = require('./task');

var huntSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  description: String,
  start_time: Date,
  end_time: Date,
  password: String,
  location: String,
  price: Number,
  tasks: { type: mongoose.Schema.ObjectId, ref: 'Task'}
  // tasks: { type: mongoose.Schema.ObjectId, ref: 'Participant'}
});

var Hunt = mongoose.model('Hunt', HuntSchema);
module.exports = Hunt;