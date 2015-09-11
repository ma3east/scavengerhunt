var mongoose = require('mongoose');
var User     = require('./user');
var Task     = require('./task');

var CompletedTaskSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.ObjectId, ref: 'User'},
  taskId: {type: mongoose.Schema.ObjectId, ref: 'Task'},
  image: String,
  tweet: String,
  date: Date
});

var CompletedTask = mongoose.model('CompletedTask', CompletedTaskSchema);
module.exports = CompletedTask;

