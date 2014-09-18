/**
 * @module SMDEP
 * @desc Application Routing
 * @version 1.0.0
 * @copyright American Association of Medical Colleges
 * @author <Author Name>
 */
angular.module('SMDEP')
    .config(function($stateProvider, SSOSecurityProvider) {        
        /**
         * Index Route
         */
        $stateProvider.state('index', {
            pageTitle: 'Home',
            url: '/',
            controller: 'IndexController',
            templateUrl: 'states/index/index.html',
            resolve: {
                context: SSOSecurityProvider.getAuthenticatedUser
            }
        }).state('wizard', {
		url: '/wizard',
		controller: 'wizardController',
		templateUrl: 'states/wizard/wizard.html'
	});
    });
