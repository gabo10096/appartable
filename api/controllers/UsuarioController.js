/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createUsuario: function (req, res){
		
		var body = req.body;
		
		var params = {
			usuario: body.usuario,
			password: body.password,
			tipo_usuario: body.tipo_usuario,
			id_negocio: body.id_negocio,
			id_sucursal: body.id_sucursal
		};

		Usuario.create(params, function (err, usuario){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Creating usuario.'
				});
			};
			if (!usuario) {
				return res.status(400).send({
					success: false,
					message: 'Usuario Not Found.'
				});
			};
			return res.status(200).send({
				success: true,
				usuario: usuario
			});
		});
	},

	readUsuarios: function (req, res){
		Usuario.find(function(err, usuarios){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Finding usuarios.'
				});
			};
			if (!usuarios) {
				return res.status(400).send({
					success: false,
					message: 'Usuarios Not Found.'
				});
			};
			return res.status(200).send({
				success: true,
				usuario: usuarios
			});
		});
	},

	readUsuario: function (req, res){
		var id = req.params.id;
		Usuario.find({id_usuario: id},function(err, usuario){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Finding usuario.'
				});
			};
			if (!usuario) {
				return res.status(400).send({
					success: false,
					message: 'Usuario Not Found.'
				});
			};
			return res.status(200).send({
				success: true,
				usuario: usuario
			});
		});
	}
	
};