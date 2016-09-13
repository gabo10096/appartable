/**
 * NegocioController
 *
 * @description :: Server-side logic for managing negocios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createNegocio: function (req, res){
		var body = req.body;
		var params = {
			razon_social: body.razon_social,
			nombre_negocio: body.nombre_negocio,               
			nombre_encargado: body.nombre_encargado,
			usuario: body.id_usuario,
			status_negocio: body.status_negocio
		};
		Negocio.create(params, function (err, negocio){
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
			return res.status(200).send({
				success: true,
				negocio: negocio
			});
		});
	}
	
};