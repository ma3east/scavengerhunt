angular.module('scavengerHunt')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User'];
function UsersController(User){
  var self = this;

  self.user = {}

  self.users = User.query();

  self.getUser = function(user) {
    self.getUser = User.get({id: user._id});
  };

  self.addUser = function() {
    User.save(self.user, function(user) {
      self.users.push(user);
      self.user = {}
    })
  };

}