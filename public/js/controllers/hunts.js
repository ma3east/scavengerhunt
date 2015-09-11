angular.module('scavengerHunt')
  .controller('HuntsController', HuntsController)

HuntsController.$inject = ['Hunt', '$state']
function HuntsController (Hunt, $state) {

  var self = this;
  
  self.all = Hunt.query();
  self.showHunt = function (hunt) {
  Hunt.get({ id: hunt._id }, function (response) {
    self.hunt = response;
    $state.go('showHunt')
  });

}

self.addHunt = function (hunt) {
  Hunt.save(hunt, function (response) {
    self.all = response;
  });
}
self.deleteHunt = function (hunt) {
  // Hunt.delete(hunt._id, function (response) {
  //   console.log(response)
  // } )
}

}