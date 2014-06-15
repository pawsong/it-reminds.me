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
    'ngTouch',
    'ui.router'
  ])
  .config(function (
    $locationProvider,
    $stateProvider,
    $urlRouterProvider
    ) {
    $locationProvider
      .hashPrefix('!')
      .html5Mode(false);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('root', {
        abstract: true,
        url: '',
        template: '<div class="fit-to-parent" data-ui-view=""></div>',
        resolve: {
          articles: ['$http', function ($http) {
            return $http.get('/data/articles.json').then(function (res) {
              return res.data;
            });
          }]
        }
      })
      .state('root.home', {
        url: '/',
        controller: 'HomeCtrl'
      })
      .state('root.article', {
        url: '/articles/:name',
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      });
  }).run(function ($rootScope, $state) {$rootScope.$state = $state;});