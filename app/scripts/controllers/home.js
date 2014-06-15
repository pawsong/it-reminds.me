'use strict';

/**
 * @ngdoc function
 * @name windowApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the windowApp
 */
angular.module('windowApp')
  .controller('HomeCtrl', function (
    $scope,
    $state,
    articles
    ) {
    if (articles.length === 0) {
      throw new Error('Empty article list');
    }

    var article = articles[0];

    $state.go('root.article', {
      name: article.name
    });
  });
