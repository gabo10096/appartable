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

  	fullName: {
  		type: 'string'
  	},

  	smallName: {
  		type: 'string'
  	},

    rfc: {
      type: 'string'
    },

    logo: {
      type: 'string'
    },

  	encargado: {
  		type: 'string'
  	},

  	usuario: {
  		type: 'string'
  	},

    location: Object, /* {lat,long} */

  	status: {
  		type: 'boolean'
  	},

  	sucursales: Array, 

    insumos: Array,

  }
  
};

