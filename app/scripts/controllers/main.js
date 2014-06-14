'use strict';

/**
 * @ngdoc function
 * @name windowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the windowApp
 */
angular.module('windowApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
