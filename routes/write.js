var forms = require('../db/forms');

exports.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();
	req.session.redirectMessage = 'Please  login via Facebook to write and share stories.';
	res.redirect('/login');
};

exports.show = function(req, res) {
	res.render('write', {layout: 'main_private'});
};

//the story had already been written and we pass in the already written parts to be edited
exports.edit = function(req, res) {
	var storyId = req.params.id; //eg, /story/58493f7gds
	var promise = forms.readOwnStory(req.session.facebookId, storyId);
	promise.then(function(storyArray) {
		var story = storyArray.stories[0];
		res.render('write', {layout: 'main_private', story: story});
	})};


exports.publishStory = function(req, res) {

	//if the story already has an id, then the story already exists, thus, simply update the story instead of making a new one
	if (req.body.storyId) {
		var promise = forms.updateStory(
			req.session.facebookId,
			req.body.title,
			req.body.subTitle,
			req.body.content,
			req.body.dateCreated,
			req.body.keywords,
			"Published",
			req.body.storyId
		);

		promise.then(function(){
			res.redirect(303, 'self-stories');
		});
	}
	else {
		console.log(req.body);
		var promise = forms.createNewStory(
			req.session.facebookId,
			req.body.title,
			req.body.subTitle,
			req.body.content,
			req.body.dateCreated,
			req.body.keywords,
			"Published"
		);

		promise.then(function () {
			res.redirect(303, 'self-stories');
		});
	}
};

exports.saveStory = function(req, res) {
	//if the story already has an id, then the story already exists, thus, simply update the story instead of making a new one
	if (req.body.storyId) {
		var promise = forms.updateStory(
			req.session.facebookId,
			req.body.title,
			req.body.subTitle,
			req.body.content,
			req.body.dateCreated,
			req.body.keywords,
			"Saved",
			req.body.storyId
		);

		promise.then(function(){
			res.redirect(303, 'self-stories');
		});
	}
	else {
		var promise = forms.createNewStory(
			req.session.facebookId,
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
	}

};

