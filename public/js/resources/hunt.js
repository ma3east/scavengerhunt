angular
 .module('scavengerHunt')
 .factory('Hunt', Hunt);

 Hunt.$inject = ['$resource'];
 function Hunt ($resource) {

  var url = 'http://localhost:3000/api/hunts/'
  var HuntResource = $resource(url + ':id',
    {id: '@_id'},
    { 'joined': { method: 'POST', url: url + 'joined' }
  });

  return HuntResource;
}
