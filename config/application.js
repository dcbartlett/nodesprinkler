var passport 	  = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bcrypt		  = require('bcrypt');
 
// helper functions
function findById(id, fn) {
	user.findOne(id).done( function(err, user){
		if (err){
			console.log(err);
			return fn(null, null);
		}else{
			return fn(null, user);		
		}
	});
}
 
function findByUsername(u, fn) {
	User.findOne({
	  username: u
	}).done(function(err, user) {
		// Error handling
		if (err) {
			console.log(err);
			return fn(null, null);
		// The User was found successfully!
		}else{
			return fn(null, user);
		}
	});
}
 
 
// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});
 
 
// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object. 
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(null, err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        bcrypt.compare(password, user.password, function(err, res) {
			console.log('bcrypt hash check was success? ', res);
		    if (!res) return done(null, false, { message: 'Invalid Password'});
		    return done(null, null, { message: 'Logged In Successfully'} );
		});
      })
    });
  }
));

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
		level: 'info'
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