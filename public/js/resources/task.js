angular
<<<<<<< HEAD
 .module('scavengerHunt')
 .factory('Hunt', Hunt);

 Hunt.$inject = ['$resource'];
 function Hunt ($resource) {

  var url = 'http://localhost:3000/api/hunts/'
  var HuntResource = $resource(url + ':id', {id: '@_id'}, {
    'update': { method: 'PUT' }
  });
  return HuntResource;
=======
  .module('scavengerHunt')
  .factory('Task', Task);

Task.$inject = ['$resource'];
function Task ($resource) {

 var url = 'http://localhost:3000/api/tasks/'

 var TaskResource = $resource(url + ':id',
    {id: '@_id'},
    { 'update': { method: 'PUT' }
 });

 return TaskResource;

>>>>>>> 31f4d59399448f8930c3fd3fd3c9d0335ad115ae
}