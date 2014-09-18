/* jshint -W030 */
describe('IndexController Test', function () {
    var IndexCtrl, $scope, APP_CONFIG;

    beforeEach(function () {
        module('ui.router');        
        module('SMDEP.index');
    });

    beforeEach(inject(function($controller, $rootScope){
        $scope = $rootScope.$new();
        APP_CONFIG = {};
        IndexCtrl = $controller('IndexController', {
            $scope: $scope,
            APP_CONFIG: APP_CONFIG
        });

    }));

    afterEach(function () {

    });

    it('should fail to show failing test', function () {
        expect(true).to.be.ok;
        expect(1).to.be.ok;
        expect(0).not.to.be.ok;
    });
});