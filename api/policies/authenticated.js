// We use passport to determine if we're authenticated
module.exports = function(req, res, next){
  if (req.isAuthenticated())
		return next();

  else return res.redirect('/login')
}