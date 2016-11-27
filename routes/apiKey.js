/**
 * Created by Lenny on 2016-11-26.
 */

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.session.redirectMessage = 'Please  login via Facebook to register for an API key.';
    res.redirect('/login');
};


exports.show = function(req, res) {
    res.render('apiKey', { layout: 'main_private'});
};