var forms = require('../db/forms');


exports.show = function(req, res) {
	res.render('write', {layout: 'main_private'});
};


exports.publishStory = function(req, res) {
	var promise = forms.createNewStory(
		req.body.title,
		req.body.subTitle,
		req.body.content,
		req.body.dateCreated,
		req.body.keywords,
		"Published"
	);

	promise.then(function(){
		res.redirect(303, 'self-stories');
	});
};

exports.saveStory = function(req, res) {
	var promise = forms.createNewStory(
		req.body.title,
		req.body.subTitle,
		req.body.content,
		req.body.dateCreated,
		req.body.keywords,
		"Saved"
	);

	promise.then(function(){
		res.redirect(303, 'self-stories');
	});
};
