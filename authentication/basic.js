/**
 * Created by Lenny on 2016-12-03.
 */

var basicAuth = require('basic-auth');
var basicDb = require('../db/basic');

exports.isAuthenticated = function (req, res, next) {
    console.log('hi');
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }

    var user = basicAuth(req);
    console.log(user);
    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    console.log('about to call findUser');
    basicDb.findUser(user.name, user.pass).then(function(id) {
        if (id.length > 0) //not user why if (id) doesn't work
        {
            res.locals.basicClientId = user.name;
            return next();
        }
        else
        {
            return unauthorized(res);
        }

    });
};



