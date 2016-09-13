/**
* Negocio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	id_negocio: {
  		type: 'string'
  	},
  	razon_social: {
  		type: 'string'
  	},
  	nombre_negocio: {
  		type: 'string'
  	},
  	nombre_encargado: {
  		type: 'string'
  	},
  	usuario: {
  		type: 'string'
  	},
  	status_negocio: {
  		type: 'boolean'
  	},
  	sucursales: Array, 
  	/*
  	sucursales:[{
		id_sucursal,
		usuario,
		direccion,
		coordenadas: {
			latitud,
			longitud
		},
		mesas:[{
			num_mesa,
			status_mesa
		}],
		menu:{
			desayunos, 
			comidas,
			cenas, 
			bebidas,
			postres,
		},
		descripcion
  	}]
  	*/
  }
};

