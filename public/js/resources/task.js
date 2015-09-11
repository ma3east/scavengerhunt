angular.module('scavengerHunt')
  .factory('Task', Task);

Task.$inject = ['$resource'];
function Task ($resource) {

 var url = 'http://localhost:3000/api/tasks/'

 var TaskResource = $resource(url + ':id',
    {id: '@_id'},
    { 'update': { method: 'PUT' }
 });

 return TaskResource;

}