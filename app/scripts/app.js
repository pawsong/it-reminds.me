'use strict';

/**
 * @ngdoc overview
 * @name windowApp
 * @description
 * # windowApp
 *
 * Main module of the application.
 */
angular
  .module('windowApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider
      .hashPrefix('!')
      .html5Mode(false);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
