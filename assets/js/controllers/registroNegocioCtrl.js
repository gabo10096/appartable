angular.module('registroNegocioCtrl', [])
	.controller('registroNegocio', function ($scope, $rootScope, $stateParams, $state, $location, $timeout, generalServices) {
		$scope.registro = {};
		$scope.registraNegocio = function (){
			generalServices.registraNegocio($scope.registro).success(function (res){
				$state.reload();
			}).error(function (res){

			})
		}
	})