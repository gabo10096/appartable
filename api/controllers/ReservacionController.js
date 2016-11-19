/**
 * ReservacionesController
 *
 * @description :: Server-side logic for managing reservaciones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

qr = require('qr-image')

module.exports = {

	creteReservacion: function (req, res){

		var body = req.body;

		var paramsReserva = {
			id_negocio: body.id_negocio,
			id_sucursal: body.id_sucursal,
			num_mesa: body.num_mesa,
			status: body.status,
			fecha: body.fecha,
			hora: body.hora,
			alias: body.alias
			//qrCode: null
		};
	
		Reservacion.create(paramsReserva, function (err, reservacion){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Registro de Reservacion.'
				});
			};
			if (!reservacion) {
				return res.status(404).send({
					success: false,
					message: 'Reservación no encontada.'
				});
			};
			return res.json({
				success: true,
				reservacion: reservacion
			});
		});
	},

	viewQRcode: function (req, res){
		
	 	Reservacion.findOne({id: req.params.id}, function (err, reservacion){
	 		if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Ver codigo QR.'
				});
			};
			if (!reservacion) {
				return res.status(404).send({
					success: false,
					message: 'Reservación no encontrada o no existe.'
				});
			};

			//link: https://blog.nodejitsu.com/npmawesome-qr-codes/

			var data = JSON.stringify(reservacion);

			var qrCode = qr.image(data, { type: 'svg' });

			res.type('svg');

			qrCode.pipe(res);
	 	})
	},

	readReservaciones: function (req, res){

		Reservacion.find(function (err, reservaciones){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Consulta de todas las reservaciones.'
				});
			};
			if (!reservaciones) {
				return res.status(404).send({
					success: false,
					message: 'No se encontraron las reservaciones o no hay registradas.'
				});
			};
			return res.json({
				success: true,
				reservaciones: reservaciones
			});
		});
	},

	deleteReservacion: function (req, res){

		Reservacion.destroy({id: req.params.id}, function (err, reservacionDEL){
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'Internal Server Error. Eliminacion de reservacion.'
				});
			};
			if (!reservacionDEL) {
				return res.status(404).send({
					success: false,
					message: 'Reservación no encontrada o no existe.'
				});
			};
			return res.json({
				success: true,
				message: 'Reservación eliminada correctamente.'
			});
		});
	}
	
};

