var //passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;
    
module.exports = function (passport, opts, cb) {
	var userModel = opts.models.User;
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		if(obj._id){
			userModel.findById(obj._id, function(err, user){
				done(null, obj);
			});
		}
	});

	passport.use('local-login', new LocalStrategy({usernameField: 'name', passwordField: 'password', passReqToCallback: true}, function(req, name, password, done){
		userModel.findOne({$and : [{'name': name}, {'password':password}]}).populate('company', 'site').exec(function(err, user){
			if(err){
				console.log(err);
				console.log(' ---- err ---- ');
				return done(err, false, req.flash('loginMessage', 'Service temporarily unavailable.'));
			}
			if(!user){
				console.log(' ---- user not found ---- ');
				return done(null, false, req.flash('loginMessage', 'Could not find any user with given credentials.'));
			}

			return done(null, user);
		});
	}));

    if (cb) {
        cb(null);
    }
}