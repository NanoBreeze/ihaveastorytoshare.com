/**
 * Created by Lenny on 2016-11-26.
 */

var forms = require('../db/forms');

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.session.redirectMessage = 'Please  login via Facebook to register for an API key.';
    res.redirect('/login');
};


exports.show = function(req, res) {

    console.log(req.session.facebookId);
    forms.readAPICredentials(req.session.facebookId).then(function(returnedObj) {
        console.log(returnedObj);
        var clientSecret = returnedObj.basicCredentials.clientSecret;
        var clientId = returnedObj.basicCredentials.clientId;
        console.log(clientSecret);
        res.setHeader('Cache-control', 'private, max-age=31557600');
        res.render('apiKey', { layout: 'main_private', clientSecret: clientSecret, clientId: clientId});
    });
};