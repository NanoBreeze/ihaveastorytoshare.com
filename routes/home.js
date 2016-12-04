
/* GET home page. */

var forms = require('../db/forms');


exports.show = function(req, res) {
	var promise = forms.readAllPublishedStories();

	promise.then(function(storyArray){
		var topStories = [];

		var storyCount = Math.min(storyArray[0].stories.length, 8);
		//the individual stories are in an array that's in another array
			for (var j = 0; j < storyCount; j++)
			{
				topStories.push(storyArray[0].stories[j]);
			}


		// console.log(topStories);
		console.log('home.show() called');

		var isNotLoggedIn = req.isAuthenticated() ? false : true;

		res.render('home', {layout: req.session.layout, topStoryPreviews: topStories, isNotLoggedIn: isNotLoggedIn});
	});
};

exports.determineLayout = function(req, res, next) {
	console.log('inside home.determinedLayouts');
	if (req.isAuthenticated()) { req.session.layout = 'main_private'; }
	else { req.session.layout = 'main_public'; }

	return next();
};