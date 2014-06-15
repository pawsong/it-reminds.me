'use strict';

/**
 * @ngdoc function
 * @name windowApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the windowApp
 */
angular.module('windowApp')
  .controller('ArticleCtrl', function (
    $scope,
    $state,
    $stateParams,
    articles
    ) {

    var article = null;
    var i;

    for (i=0; i < articles.length; i++) {
      if (articles[i].name === $stateParams.name) {
        article = articles[i];
      }
    }

    if (article === null) {
      $state.go('root.home');
      return;
    }

    $scope.article = article;
  });