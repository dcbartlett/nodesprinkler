var passport 	  = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
	
module.exports = {
	
	// Name of the application (used as default <title>)
	appName: "NodeSprinkler",

	// Port this Sails application will live on
	port: process.env.PORT || 1337,

	// The environment the app is deployed in 
	// (`development` or `production`)
	//
	// In `production` mode, all css and js are bundled up and minified
	// And your views and templates are cached in-memory.  Gzip is also used.
	// The downside?  Harder to debug, and the server takes longer to start.
	environment: 'development',

	// Logger
	// Valid `level` configs:
	// 
	// - error
	// - warn
	// - debug
	// - info
	// - verbose
	//
	log: {
		level: 'verbose'
	},
	express: {
		customMiddleware: function(app)
		{
			app.use(passport.initialize());
			app.use(passport.session());
		}
	},
	// CSRF middleware protection, all non-GET requests must send '_csrf' parmeter
	// _csrf is a parameter for views, and is also available via GET at /csrfToken
	csrf: false

};