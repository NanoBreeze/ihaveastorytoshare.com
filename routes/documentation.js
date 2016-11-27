/**
 * Created by Lenny on 2016-11-26.
 */

exports.determineLayout = function(req, res, next) {
	if (req.isAuthenticated()) { req.session.layout = 'main_private'; }
	else { req.session.layout = 'main_public'; }

	return next();
};

exports.show = function(req, res) {
    res.render('documentation', { layout: req.session.layout});
};