var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number
  // type: {type: mongoose.Schema.ObjectId, ref: 'TaskType'}
})

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;

