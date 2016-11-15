var forms = require('../db/forms');

exports.show = function(req, res) {
	var promise = forms.readProfile();
	promise.then(function(profile){
		console.log(profile);
		res.render('dashboard', {layout: 'main_private', profile: profile});
	});

		// res.render('dashboard', {layout: 'main_private', hello: "hello"});


	// // console.log(userProfile);
	// res.render('dashboard', {layout: 'main_private', userProfile: userProfile});
};

exports.updateProfile = function(req, res){
	var promise = forms.updateProfile(
		req.body.firstName,
		req.body.lastName,
		req.body.email,
		req.body.interests
	);
	promise.then(function(){
		res.redirect(303, 'dashboard');
	});

};