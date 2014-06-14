'use strict';

/**
 * @ngdoc function
 * @name windowApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the windowApp
 */
angular.module('windowApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
