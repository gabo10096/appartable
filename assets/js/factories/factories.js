angular.module('appartable-services',[])
	.factory('generalServices', ['$http', function ($http) {
				//apiadmin = '/administrador'*/;
			return {
				registraNegocio : function (registro) {
					return $http.post('/registro/negocio', registro)
				},
				bitacoras : function (num) {
					return $http.get(apiEndpoint + '/bitacora/lite/'+ num)
				},
			}
		}])