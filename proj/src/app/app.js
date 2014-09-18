/**
 * @module SMDEP
 * @desc Main Application Configuration
 * @version 1.0.0
 * @copyright American Association of Medical Colleges
 * @author <Author Name>
 */

/**
 * Initializes the angular application module
 *  @param angular The Angular core object
 */
angular.module('SMDEP', [
    'SMDEP.index',
	'SMDEP.wizard',
    'templates-app',    
    'ui.router',
    'aamc.component.nav-bar',
    'aamc.component.security',
    'aamc.component.login-standalone',
    'aamc.component.account-manager',
    'aamc.component.footer',
    'templates-components'
])
    .config(function($httpProvider, $urlRouterProvider, APP_CONFIG, applicationConfigServiceProvider, accountManagerServiceProvider) {
        $httpProvider.defaults.withCredentials = true;
        applicationConfigServiceProvider.setConfig(APP_CONFIG);
        $urlRouterProvider.otherwise('/');

        accountManagerServiceProvider.setModal(true);      
    })
    .run(function($log){
        $log.debug('Application Initialized');
    });
