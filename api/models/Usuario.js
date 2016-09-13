/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id_usuario:{
  		type: 'string'
  	},
  	usuario:{
  		type: 'string',
  		unique: true
  	},
  	password:{
  		type: 'string'
  	},
  	tipo_usuario:{
  		type: 'string' // administrador || operador 
  	},
  	id_negocio:{
  		type: 'string'
  	},
  	id_sucursal:{
  		type: 'string'
  	}
  }
};

