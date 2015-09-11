angular.module('scavengerHunt')
.controller('HuntsController', HuntsController)

HuntsController.$inject = ['Hunt', '$state']
function HuntsController (Hunt, $state) {

  var self = this;
  self.hunt = {};
  self.newHunt = {};
  self.all = Hunt.query();

  self.showHunt = function (hunt) {
    console.log(hunt);
    Hunt.get({ id: hunt._id }, function (response) {
      // console.log(response);
     
      $state.go('showHunt');
      self.hunt = response;
    });
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