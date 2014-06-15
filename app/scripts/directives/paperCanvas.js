'use strict';

/**
 * @ngdoc directive
 * @name windowApp.directive:paperCanvas
 * @description
 * # paperCanvas
 */
angular.module('windowApp')
  .directive('paperCanvas', function ($http) {
    var paper = window.paper;
    window.paper = null;

    return {
      template: '<canvas class="canvas"></canvas>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var ps = new paper.PaperScope();
        var canvas = element[0];

        if (typeof attrs.script !== 'string') {
          throw new Error('\'script\' attribute must be given.');
        }

        $http.get('/papers/' + attrs.script).then(function (res) {
          var paperScp = res.data;
          ps.setup(canvas);

          paper.PaperScript.execute(paperScp, ps);
        });
      }
    };
  });
