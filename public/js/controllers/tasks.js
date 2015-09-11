angular.module('scavengerHunt')
  .controller('TasksController', TasksController);

TasksController.$inject = ['Task'];
function TasksController(Task){
  var self = this;

  self.task = {}
 
  self.tasks = Task.query();

  self.getTask = function(task) {
    self.getTask = Task.get({id: task._id});
  };

  self.addTask = function() {

    Task.save(self.task, function(task) {
      self.tasks.push(task);
      self.task = {}
    })
  };

  this.deleteTask = function(task){
    Task.delete({id: task._id});
    var index = self.tasks.indexOf(task);
    self.tasks.splice(index, 1);
  };

}