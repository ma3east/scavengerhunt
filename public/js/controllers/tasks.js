angular.module('scavengerHunt')
  .controller('TasksController', TasksController);

TasksController.$inject = ['Task', 'Hunt', '$stateParams'];
function TasksController(Task, Hunt, $stateParams){
  var self = this;

  self.hunt = $stateParams.hunt_id;
  self.task = {}
 
  // Might only need id
  if ($stateParams.id) {
    Hunt.get({ id: $stateParams.hunt_id}, function(hunt){
      self.hunt = hunt;
      console.log(hunt);
    })
  }

  // self.tasks = Task.query();

  self.getTask = function(task) {
    self.getTask = Task.get({id: task._id});
  };

  self.addTask = function() {
    // Task.save(self.task, function(task) {
    //   self.tasks.push(task);
    //   self.task = {}
    // })
  };

  this.deleteTask = function(task){
    Task.delete({id: task._id});
    var index = self.tasks.indexOf(task);
    self.tasks.splice(index, 1);
  };

}