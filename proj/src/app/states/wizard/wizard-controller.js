    /**
     * Page controller for the wizard
     * @param $scope - Angular scope object
     */
    angular.module('SMDEP.wizard',['ui.router'])
        .controller('wizardController', function($scope) {
        $scope.title = 'wizard';
    });