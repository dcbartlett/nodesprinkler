module.exports.policies = {
  // default require authentication
  // see api/policies/authenticated.js
	'*': 'authenticated',
  // whitelist the auth controller
	'auth':{
		'*': true
	}
};