angular.module('scavengerHunt')
  .controller('TasksController', TasksController);

TasksController.$inject = ['Task', 'CurrentUser'];
function TasksController(Task, CurrentUser){
  var self = this;

  self.task = {}
 
  self.tasks = Task.query();

  self.getTask = function(task) {
    self.getTask = Task.get({id: task._id});
  };

  self.addTask = function() {
     // self.push(window.localStorage.currentHunt 
    Task.save(self.task, function(task) {
      self.tasks.push(task);
      self.task = {}
    })
  };

  self.deleteTask = function(task){
    Task.delete({id: task._id});
    var index = self.tasks.indexOf(task);
    self.tasks.splice(index, 1);
  };

  self.completeTask = function(task){
    data = { task_id: task._id, completedTask: { task_id: task._id, user_id: '' } } 
    Task.completed(data)
  }

}