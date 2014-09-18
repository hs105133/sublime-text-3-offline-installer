/* jshint -W030 */

  
    describe('wizard Controller', function() {
      var $scope;
      beforeEach(module('SMDEP.wizard'));

      beforeEach(inject(function($injector) {
        var $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
        $controller('wizardController', {$scope: $scope});
      }));

      //Write tests below this line
      it('should have tests defined', function() {
        expect(true).to.be.ok;
      });

    });