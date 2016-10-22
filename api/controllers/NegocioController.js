/**
 * NegocioController
 * @author Gabriel Aguilar
 */

module.exports = {

	/**
		* Alta de Negocio y Usuario
		
		* @method createNegocio

		* @param {String} fullName      nombre largo  	 
		* @param {String} smallName 	nombre corto        
		* @param {String} rfc 	        rfc    
		* @param {String} logo     		logo de negocio	
		* @param {String} encargado   	nombre de encargado	
		* @param {String} usuario  		usuario de acceso	
		* @param {String} password   	password de acceso		
		* @param {Object} location   	lat y long 	

		* @example <caption>Ejemplo de JSON para Negocio y su Usuario.</caption>
		{
			"fullName": "Sanborns SA de CV",
			"smallName": "Sanborns",
			"rfc": "SAN2016",
			"logo": "Sanborns.png",
			"encargado": "Carlos Slim",
			"usuario": "sanborns",
			"password": "123",
			"location": {
				"lat" : 55654654.3,
				"long" : 654.654
			}
		}		

		* @description Ruta de consumo: POST /registro/negocio

		* @return JSON negocio y usuario registrado.
	*/
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
			sucursales: [], 
			insumos: []
		};
		
		Negocio.create(paramsNegocio, function (err, negocio){
			if (err) {
				return res.status(500).send({
					success: false, 
					message: 'Internal Server Error. Alta de Negocio.'
				});
			};
			if (!negocio) {
				return res.status(400).send({
					success: false, 
					message: 'Negocio no encontrado o no existe.'
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
						message: 'Internal Server Error. Alta de usuario de Negocio.'
					});
				};
				if (!usuario) {
					return res.status(400).send({
						success: false,
						message: 'Usuario no encontrado o no existe.'
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

	/**
		* Alta de Sucursal y Usuario
		
		* @method createSucursal

		* @param {String} id_negocio    negocio de la sucursal  	 
		* @param {String} nombre 		nombre de la sucursal        
		* @param {String} encargado 	nombre del encargado de la sucursal
		* @param {String} usuario     	usuario de acceso
		* @param {String} password   	password de acceso
		* @param {Array}  tables  		num_mesa y status		
		* @param {String} photo   	    foto de sucursal	
		* @param {String} description   descripcion de la sucursal	
		* @param {Object} location   	lat y long 	

		* @example <caption>Ejemplo de JSON para Sucursal y Usuario.</caption>
		{
			"id_negocio": "1",
			"nombre": "Sanborns Aeropuerto",
			"encargado": "Juan Sosa",
			"usuario": "juan_sosa",
			"password": "123",
			"numero_mesas": 3,
			"tables": [{
				"num_mesa": 1,
				"status": "disponible"
			},
			{
				"num_mesa": 2,
				"status": "ocupado"
			},
			{
				"num_mesa": 3,
				"status": "tu_reservacion"
			}],
			"photo": "s_aero.png",
			"description": "Sanborns de Aeropuerto",
			"location": {
				"lat": 564.54,
				"long": 56.23
			}
		}	

		* @description Ruta de consumo: POST /registro/sucursal

		* @return JSON sucursal registrada.
	*/
	createSucursal: function (req, res){
		
		var body = req.body;

		var id_negocio = body.id_negocio,
			id_sucursal;

		Negocio.findOne({id: id_negocio}, function (err, negocio){ // al pasar a mongo cambiar id_negocio
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Busqueda de Negocio - Sucursal.'
				});
			};
			if (!negocio) {
				return res.status(404).send({
					success: false,
					message: 'Negocio no encontrado. Sucursal.'
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
		  		numero_mesas: body.numero_mesas,
		      	tables: body.tables,
		      	photo: body.photo,
		      	description: body.description,
		      	location: body.location,
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
						message: 'Internal Server Error. Alta de Sucursal.'
					});
				};
				if (!sucursal) {
					return res.status(400).send({
						success: false,
						message: 'Sucursal no encontrada o no existe.'
					});
				};
				return res.json({
					success: true,
					message: 'Sucursal registrada exitosamente',
					sucursal: sucursal[0].sucursales
				});
			});
		});
	},

	/**
		* Alta de insumos en Negocio
		
		* @method createInsumo

		* @param {String} id_negocio    negocio del insumo  	 
		* @param {String} nombre 		nombre del insumo   
		* @param {String} categoria 	categoria del insumo
		* @param {float}  precio     	preciodel insumo	
		* @param {String} photo   	    foto del insumo
		* @param {String} description   descripcion del insumo	

		* @example <caption>Ejemplo de JSON para Insumos.</caption>
		{
			"id_negocio": "1",
			"nombre": "Chilaquiles",
			"categoria": "Desayuno",
			"precio": "45.20",
			"photo": "Chilaquiles.png",
			"descripcion": "Chilaquiles rojos"
		}	

		* @description Ruta de consumo: POST /negocio/insumos

		* @return JSON insumo registrado.
	*/
	createInsumo: function (req, res){
		
		var body = req.body;

		var id_negocio = body.id_negocio;

		var paramsInsumo = {
			nombre: body.nombre,
			categoria: body.categoria,
			precio: body.precio,
			photo: body.photo,
			descripcion: body.descripcion
		};

		Negocio.findOne({id:id_negocio}, function (err, negocio){ // al pasar a mongo cambiar id_negocio
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Busqueda de Negocio al dar de Alta de Insumo.'
				});
			};
			if (!negocio) {
				return res.status(400).send({
					success: false,
					message: 'Negocio no encontrado o no existe.'
				});
			};
			negocio.insumos.push(paramsInsumo);
			Negocio.update({id: id_negocio}, negocio, function (err, insumo){
				if (err) {
					return res.status(500).send({
						success: false,
						message: 'Internal Server Error. Alta de Insumo en negocio.'
					});
				};
				if (!insumo) {
					return res.status(400).send({
						success: false,
						message: 'Insumo no encontrado o no existe.'
					});
				};
				return res.json({
					success: true,
					message: 'Insumo registrado con exito.',
					insumo: insumo[0].insumos
				});
			});
		});
	},

	/**
		* Consulta de negocios
		
		* @method readNegocios		

		* @description Ruta de consumo: GET /negocios

		* @return JSON (Array) de los negocios registrados.
	*/
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

	/**
		* Consulta de negocio pot su ID
		
		* @method readNegocio	

		* @param {String} id    ID del negocio en URL	

		* @description Ruta de consumo: GET /negocio/:id

		* @return JSON del negocios buscado por el id.
	*/
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

	/**
		* Consulta de sucursal de negocio buscado por ID de ambos
		
		* @method readNegocioSucursal	

		* @param {String} idn    ID del negocio en URL
		* @param {String} ids    ID de la sucursal en URL	

		* @description Ruta de consumo: GET /negocio/:idn/sucursal/:ids

		* @return JSON de la sucursal buscada por el id.
	*/
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
	},

	/**
		* Consulta de todos los insumos de una sucursal
		
		* @method readInsumos	

		* @param {String} id    ID del negocio en URL	

		* @description Ruta de consumo: GET /insumos/:id

		* @return JSON (Array) de los insumos del negocio buscados por el id del negocio.
	*/
	readInsumos: function (req, res){

		var params = req.params;

		var id = params.id;

		Negocio.findOne({id: id}, function (err, insumos){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Consulta de Insumos.'
				});
			};
			if (!insumos) {
				return res.status(400).send({
					success: false,
					message: 'No hay insumos registrados en este negocio.'
				});
			};
			return res.json({
				success: true,
				negocio: insumos.smallName,
				insumos: insumos.insumos
			});
		});
	},

	/**
		* Elimina un insumo segun su posicion en el Array insumos de un negocio segun si ID
		
		* @method deleteInsumo	

		* @param {String} idn    ID del negocio
		* @param {String} idi    poscion en array del insumo

		* @example <caption>Ejemplo de JSON eliminar insumo.</caption>

		{
			"idn": 1,
			"idi": 2
		}

		* @description Ruta de consumo: POST /delete/insumo

		* @return JSON (Array) del Array insumo actualizado.
	*/
	deleteInsumo: function (req, res){

		var body = req.body;

		var idn = body.idn
			idi = body.idi-1;

		Negocio.findOne({id: idn}, function (err, insumos){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Consulta de Insumos.'
				});
			};
			if (!insumos) {
				return res.status(400).send({
					success: false,
					message: 'No hay insumos registrados en este negocio.'
				});
			};

			var insumoUpdated = [];

			var array = insumos.insumos;

			for (var i = 0; i < array.length; i++) {
				if (i == idi) {
					continue;
				}
				insumoUpdated.push(array[i]);
			};

			insumos.insumos = insumoUpdated;

			Negocio.update({id: idn}, insumos, function (err, insumosUpdated){
				if (err) {
					return res.status(500).send({
						success: false,
						message: 'Internal Server Error. Delete de insumo',
					});
				};
				if (!insumosUpdated) {
					return res.status(400).send({
						success: false,
						message: 'Insumo no encontrado.'
					});
				};
				return res.json({
					success: true,
					message: 'Insumo eliminado exitosamente.',
					insumosUpdated: insumosUpdated[0].insumos
				});
			});
		});
	}
	
};