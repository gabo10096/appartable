// == Cron para creación (en caso de no existir) de usuario appartable automáticamente ==

var CronJob = require('cron').CronJob;

exports.activate = function () {

	Cron.findOne({
		status:true
	},function (err, cronExist){

		if (!cronExist) {

			Cron.create({
				status:true,
				fecha: new Date()
			}, function (err){
				if (err) {
					console.log('Error en cron expedientes', err)
				}
			})
			upCron()
			return 

		}
		upCron()
	})
					
}

exports.checkin = function (){
	Cron.findOne({
		status:true
	},function (err, cronActive){
		if (cronActive) {
			cron.activate()
		}
	})
}

function upCron (){
	try{
		new CronJob('0 * * * * *', function() {
			createAdminAppartable()
		}, null, true);
	}catch(ex) {
		console.log('Error en cron administrador appartable:' + ex)
		console.log('Restarting cron')
		cron.activate()
	}
}

function createAdminAppartable() {

	Usuario.findOne({tipo_usuario: 'appartable'}, function (err, adminAppartable){

		if (err) {
			console.log(err);
		};

		if (adminAppartable) {
			//console.log('Ya existe el adminAppartable')
		}else{
			var params = {
				fullName: 'ApparTable',
				usuario: 'appartable',
				password: '123',
				rol: 'appartable',
				status: true,
				id_negocio: 'all',
				id_sucursal: 'all'
			};

			Usuario.create(params, function (err, adminAppartableCreated){
				if (err) {
					console.log(err)
				};
				//console.log('Administrador Appartable Creado')
				//console.log(adminAppartableCreated)
			});
		};
	});
}