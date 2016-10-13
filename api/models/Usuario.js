/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

  	id_user:{
  		type: 'string'
  	},

    fullName: {
      type: 'string'
    },

  	userName:{
  		type: 'string',
  		unique: true
  	},

  	password:{
  		type: 'string'
  	},

  	rol:{
  		type: 'string' 
  	},

    status:{
      type: 'boolean'
    },

  	id_negocio:{
  		type: 'string'
  	},

  	id_sucursal:{
  		type: 'string'
  	},

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
    
  },

    beforeCreate: function(user, cb) {
       bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                console.log(err);
                cb(err);
              } else {
                user.password = hash;
                cb();
              }
          });
      });
    }

};

