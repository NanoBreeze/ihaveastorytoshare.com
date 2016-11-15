var forms = require('../db/forms');

exports.show = function(req, res) {
	// var userProfilePromise = forms.readProfile();
	// userProfilePromise.then(function(a){
	// 	// var b = a.toObject();
	// 	console.log(typeof(a));
	// 	for (var property in a) {
	// 		if (a.hasOwnProperty(property)) {
	// 			console.log(property);
	// 		}
	// 	}
	// 	// console.log("The value of a is: " + b);
	// 	// console.log("The value of a.firstName is: " + b['firstName']);
		res.render('dashboard', {layout: 'main_private'});
	});

		// res.render('dashboard', {layout: 'main_private', hello: "hello"});


	// // console.log(userProfile);
	// res.render('dashboard', {layout: 'main_private', userProfile: userProfile});
};

exports.updateProfile = function(req, res){
	forms.updateProfile(
		req.body.firstName,
		req.body.lastName,
		req.body.email,
		req.body.interests
	);
};