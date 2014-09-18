/**
 * Main Application Controller
 */
angular.module('SMDEP')
    .controller('AppController', function($scope) {
        $scope.appName = 'SMDEP';
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          $scope.pageTitle = toState.pageTitle;
        });
    });
