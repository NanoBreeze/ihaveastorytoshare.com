var forms = require('../db/forms');

exports.show = function(req, res) {
	console.log('dashboard.show here');
	// console.log(req.user);
	req.session.facebookId = req.user.facebookCredentials.id;
	var promise = forms.readProfile(req.session.facebookId);
	promise.then(function(profile){
		// console.log(profile);
		res.render('dashboard', {layout: 'main_private', profile: profile});
	});
};

exports.updateProfile = function(req, res){
	var promise = forms.updateProfile(
		req.session.facebookId,
		req.body.firstName,
		req.body.lastName,
		req.body.email,
		req.body.interests
	);
	promise.then(function(){
		res.redirect(303, 'dashboard');
	});
};