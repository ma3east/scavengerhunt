// angular
//   .module('scavengerHunt', ['ngResource', 'ui.router', 'angular-jwt'])
//   .config(MainRouter);

// angular
//   .module('scavengerHunt')
//   .run(function($http, $window) {

//     var token = $window.localStorage.getItem('token');
//     $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

//   })

// // Setup the routing with ui.router
// function MainRouter($stateProvider, $urlRouterProvider){
//   $stateProvider
//     .state('join', {
//       url: "/join",
//       templateUrl: "js/views/join.html"
//     })
//     .state('authorize', {
//       url: "/authorize",
//       templateUrl: "js/views/authorize.html"
//     })
//     .state('disappear', {
//       url: "/"
//     });

//   $urlRouterProvider.otherwise("/");
// }