/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

	_config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {

            if ((err) || (!user)) {
                return res.status(500).json({
                    user: user
                });
            }
            //console.log(user)
            req.logIn(user, function(err) {
            	//console.log('user')
                if (err) res.send(err);
    
                return res.send({
                    user: user
                });

            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        //res.redirect('/');
    }
	
};

