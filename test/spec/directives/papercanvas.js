'use strict';

describe('Directive: paperCanvas', function () {

  // load the directive's module
  beforeEach(module('windowApp'));

  var //element,
      scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function () {
    //element = angular.element('<paper-canvas></paper-canvas>');
    //element = $compile(element)(scope);
//    expect(element.text()).toBe('this is the paperCanvas directive');
  }));
});
