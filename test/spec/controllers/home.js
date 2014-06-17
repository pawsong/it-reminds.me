'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('windowApp'));

  var HomeCtrl,
      scope,
      articles;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    articles = [{
      name: 'the-day',
      paperScript: '/papers/rain.js',
      style: 'background-color: black'
    }];

    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope,
      articles: articles
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //  expect(scope.awesomeThings.length).toBe(3);
  });
});
