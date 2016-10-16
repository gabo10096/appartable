/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//crea administrador appartable automaticamente
	createAutomatico: function (req, res){
		cron.activate()
		return res.send({
			success: true
		})				
	},

	createUsuario: function (req, res){
		
		var body = req.body;
		var params = {
				fullName: body.encargado,
				usuario: body.usuario,
				password: body.password,
				rol: body.rol,
				status: true,
				id_negocio: body.idn,
				id_sucursal: body.ids
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
		Usuario.find({id: id},function(err, usuario){
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