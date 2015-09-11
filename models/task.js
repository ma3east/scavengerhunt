var mongoose     = require('mongoose');
var CompletedTask = require('./completedTask')

var TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number,
  completedTasks: [{type: mongoose.Schema.ObjectId, ref: 'CompletedTask'}]

})

var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;

