var App = angular.module('app', ['ui.router', 'appartable-services', 'registroNegocioCtrl']);

App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		//
		// For any unmatched url, redirect to /index
		$urlRouterProvider.otherwise('/index');
		//
		// Set up the states
		$stateProvider
			// Inicio
			.state('index', {
				url: '/index',
				views: {
					'mainContent': {
						templateUrl: '/templates/registroNegocio.html',
						controller: 'registroNegocio'
					}
				}
			})
			
			
	}])
	.run(['$rootScope', '$http', function ($rootScope, $http) {


	}])
