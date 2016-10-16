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
			//id_negocio,
			fullName: body.fullName,
			smallName: body.smallName,
			rfc: body.rfc,
			logo: body.logo,
			encargado: body.encargado,
			usuario: body.usuario,
			location: body.location,
			status: true,
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
				//id_suser,
				fullName: body.encargado,
				usuario: body.usuario,
				password: body.password,
				rol: 'administrador',
				status: true,
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
					message: 'Negocio y Usuario creado exitosamente.',
					negocio: negocio,
					usuario: usuario
				});
			});
		});
	},

	createSucursal: function (req, res){
		
		var body = req.body;

		var id_negocio = body.id_negocio,
			id_sucursal;

		Negocio.findOne({id: id_negocio}, function (err, negocio){ // al pasar a mongo cambiar id_negocio
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Finding Negocio - Sucursal.'
				});
			};
			if (!negocio) {
				return res.status(404).send({
					success: false,
					message: 'Negocio Not Found. Sucursal.'
				});
			};

			if (negocio.sucursales == '') {
				id_sucursal = 1;
			}else{
				var num_suc = negocio.sucursales;
				id_sucursal = (num_suc.length)+1;
			};
			var paramsSucursal = {
				id_sucursal: id_sucursal,
		      	nombre: body.nombre,
		      	encargado: body.encargado,
		  		usuario: body.usuario,
		      	tables: body.tables,
		      	location: body.location,
		      	menu: []
			};
			var paramsUsuarioSuc = {
				fullName: body.encargado,
				usuario: body.usuario,
				password: body.password,
				rol: 'sucursal',
				status: true,
				id_negocio: negocio.id,
				id_sucursal: id_sucursal
			};
			Usuario.create(paramsUsuarioSuc, function (err, usuario){
				// if (err) {
				// 	return res.status(500).send({
				// 		success: false,
				// 		message: 'Internal Server Error. Creating usuario.'
				// 	});
				// };
				// if (!usuario) {
				// 	return res.status(400).send({
				// 		success: false,
				// 		message: 'Usuario Not Found.'
				// 	});
				// };
				// res.status(200).send({
				// 	success: true,
				// 	message: 'Sucursal y Usuario creado exitosamente.',
				// 	negocio: negocio,
				// 	usuario: usuario
				// });
			});
			negocio.sucursales.push(paramsSucursal);
			Negocio.update({id: id_negocio}, negocio, function (err, sucursal){
				if (err) {
					return res.status(500).send({
						success: false,
						message: 'Internal Server Error. Creating Sucursal.'
					});
				};
				if (!sucursal) {
					return res.status(400).send({
						success: false,
						message: 'Sucursal Not Found.'
					});
				};
				return res.json({
					success: true,
					message: 'Sucursal created successfully',
					sucursal: sucursal[0].sucursales
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
	},

	readNegocio: function (req, res){
		
		var id = req.params.id;

		Negocio.findOne({id: id}, function (err, negocio){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Finding Negocio.'
				});
			};
			if (!negocio) {
				return res.status(404).send({
					success: false,
					message: 'Negocio Not Found or Not exist.'
				});
			};
			return res.json({
				success: true,
				negocio: negocio
			});
		});
	},

	readNegocioSucursal: function (req, res){
		
		var idn = req.params.idn;
		var ids = req.params.ids;

		Negocio.findOne({id: idn}, function (err, negocio){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Finding Negocio.'
				});
			};
			if (!negocio) {
				return res.status(404).send({
					success: false,
					message: 'Negocio Not Found or Not exist.'
				});
			};
			var negSuc = negocio.sucursales[ids-1];
			return res.json({
				success: true,
				sucursal: negSuc
			})
		});
	}
	
};