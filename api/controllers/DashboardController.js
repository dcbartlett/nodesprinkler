/*---------------------
	:: Dashboard 
	-> controller
---------------------*/
var DashboardController = {
	index: function(req, res){
		res.send({ message: 'hello world', user: req.user });
	}
};
module.exports = DashboardController;