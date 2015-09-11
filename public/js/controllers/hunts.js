angular.module('scavengerHunt')
.controller('HuntsController', HuntsController)

HuntsController.$inject = ['Hunt', '$state', '$stateParams']
function HuntsController (Hunt, $state, $stateParams) {

  console.log($stateParams)

  var self = this;
  self.hunt;
  self.newHunt = {};

  if ($stateParams.id) {
    Hunt.get({ id: $stateParams.id}, function(hunt){
      self.hunt = hunt;
    })
  }

  self.all = Hunt.query();

  self.showHunt = function (hunt) {
    $state.go('hunts/'+hunt._id, { hunt: hunt });
  }

  self.addTask = function(hunt){
    $state.go('newTask', { hunt: hunt });
  }

  self.createHunt = function () {
    Hunt.save(self.newHunt, function (response) {
      self.showHunt(response);
    });
  }
  self.deleteHunt = function (hunt) {
  // Hunt.delete(hunt._id, function (response) {
  //   console.log(response)
  // } )
  }

}