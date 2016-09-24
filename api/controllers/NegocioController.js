/**
 * NegocioController
 *
 * @description :: Server-side logic for managing negocios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createNegocio: function (req, res){
		
		var body = req.body;
		
		var paramsNegocio = {
			rfc: body.rfc,
			razon_social: body.razon_social,
			nombre_negocio: body.nombre_negocio,               
			nombre_encargado: body.nombre_encargado,
			usuario: body.usuario,
			status_negocio: true, 
			sucursales: []
		};
		
		Negocio.create(paramsNegocio, function (err, negocio){
			if (err) {
				return res.status(500).send({
					success: false, 
					message: 'Internal Server Error. Creating Negocio.'
				});
			};
			if (!negocio) {
				return res.status(400).send({
					success: false, 
					message: 'Negocio Not Found. Creating Negocio.'
				});
			};

			var paramsUsuario = {
				nombre: body.nombre_encargado,
				usuario: body.usuario,
				password: body.password,
				tipo_usuario: 'restaurante',
				id_negocio: negocio.id,
				id_sucursal: 'all'
			};

			Usuario.create(paramsUsuario, function (err, usuario){
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
					message: 'Sucursal y Usuario creado exitosamente.',
					negocio: negocio,
					usuario: usuario
				});
			});
		});
	},

	readNegocios: function (req, res){
		Negocio.find(function (err, negocios){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Finding Negocios.'
				});
			};
			if (!negocios) {
				return res.status(400).send({
					success: false,
					message: 'Negocios Not Found.'
				});
			};
			return res.status(200).send({
				success: true,
				negocios: negocios
			});
		});
	}
	
};