// We use passport to determine if we're authenticated
module.exports = function(req, res, next){
  if (req.isAuthenticated()){
  		console.log('user authenticated');
		return next();
  }else{
  		return res.send({ message: 'Not Authorized' })
  } 
}