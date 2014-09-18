/**
 * @module SMDEP
 * @desc Initializes the application by pulling configuration from the config service
 * @version 1.0.0
 * @copyright American Association of Medical Colleges
 * @author <Author Name>
 */
angular.element(document).ready(function() {
    $('html').attr('ng-controller', 'AppController');
     // $.get('/30/config-service/services-rs/config/AAMC', function(conf) {    
     var conf = {"BASE_URL":"https://apps.development.aamc.org","DEBUG":"true","LOGIN_URL":"https://apps.development.aamc.org/30/ssoLogin/home/login","LOGOUT_URL":"https://apps.development.aamc.org/30/ssoLogin/home/login/logout","APP_CODE":"AAMC","ACCOUNT_MANAGER_URL":"https://apps.development.aamc.org/30/ssoLogin/home/accountmanagement/accountManagementPortal","AUTH_SERVICE_URL":"https://apps.development.aamc.org/30/auth-service"};
	    
       angular.module('SMDEP').constant('APP_CONFIG', "conf");
       angular.bootstrap(document, ['SMDEP']);
     // });    
});