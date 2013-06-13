// api/controllers/AuthController.js 
var passport = require('passport');
var AuthController = {
    index: function (req,res){
        res.view();
    },
    create: function(req, res){
        passport.authenticate('local', function(err, user, info){
            if ((err) || (!user)) res.send(err);
            req.logIn(user, function(err){
                if (err) res.send(err);
                res.send(user);
                return;
            });
        })(req, res);
    },

    logout: function (req,res){
        req.logout();
        res.send('logout successful');
    }
};

module.exports = AuthController;