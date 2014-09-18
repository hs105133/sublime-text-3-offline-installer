    /**
     * @module SMDEP.index
     * @desc Page controller for the Application homepage
     * @param $scope - Angular scope object
     */
    angular.module('SMDEP.index', ['ui.router'])        
        .controller('IndexController', function($scope, APP_CONFIG) {
            $scope.appConstants = APP_CONFIG;
        });
