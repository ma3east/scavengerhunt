angular.module('scavengerHunt')
  .factory('User', User);

User.$inject = ['$resource'];

function User ($resource) {

 var url = 'http://localhost:3000/api/users/'

 var UserResource = $resource(url + ':id',
    {id: '@_id'},
    { 'update': { method: 'PUT' }
 });

 return UserResource;

}