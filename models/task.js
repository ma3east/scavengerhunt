var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number
  // type: {type: mongoose.Schema.ObjectId, ref: 'TaskType'}
})

var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;

