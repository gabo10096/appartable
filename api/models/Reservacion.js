/**
* Reservacion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	id_reservacion: {
  		type: 'string'
  	},

  	id_negocio:{
  		type: 'string'
  	},

  	id_sucursal:{
  		type: 'string'
  	},

  	num_mesa: {
  		type: 'integer'
  	},

  	status:{
  		type: 'boolean'
  	},

  	fecha: {
  		type: 'string'
  	},

    hora: {
      type: 'string'
    },

    alias: {
      type: 'string'
    },

    //qrCode: Object

  }
  
};

